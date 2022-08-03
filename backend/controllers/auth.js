const User = require("../models/User");
const Blog = require("../models/Blog");
const shortId = require("shortid");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");
const { errorHandler } = require("../utils/dbErrorHandler");
const AWS = require("aws-sdk");
const { registerSesEmailParams, forgotPass } = require("../utils/sesEmail");

// AWS SES
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

// new user - account activation
// before creating new user
// embed signup info (name, email, pass) in json token -> send to user email
// save user info when activation link is clicked - (useful for spam prevention)

// AWS SES - limited email sending ability when account is in sandbox mode
// https://docs.aws.amazon.com/ses/latest/dg/request-production-access.html
// can send email to 3 verified identities in dev mode
// todo: convert to AWS SES on production mode

exports.initialSignup = (req, res) => {
  const { name, email, password } = req.body; // same fields used for signup

  // check if email already exists in database
  User.findOne({ email: email.toLowerCase() }, (err, user) => {
    if (user) {
      // console.log(err);
      return res.status(400).json({
        error: "Email is already taken",
      });
    }

    // send hashed token with info to user email, name and password
    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACTIVATE,
      {
        expiresIn: "15m",
      }
    );

    // move params to a utility function
    const params = registerSesEmailParams(email, token);

    // email token to user
    const sendEmailOnRegister = ses.sendEmail(params).promise();
    sendEmailOnRegister
      .then((data) => {
        console.log("email submitted to SES", data);
        // res.send("email sent");
        res.json({
          message: `email has been sent to: ${email}, follow email instructions to complete registration`,
        });
      })
      .catch((err) => {
        console.log("ses email on register", err);
        res.json({
          err: "Email could not be verified.",
        });
      });
  });
};

exports.signup = (req, res) => {
  const token = req.body.token;
  if (token) {
    jwt.verify(token, process.env.JWT_ACTIVATE, function (err, decoded) {
      if (err) {
        return res.status(401).json({
          error: "Expired link. Signup again",
        });
      }

      const { name, email, password } = jwt.decode(token);

      let username = shortId.generate();
      let profile = `${process.env.CLIENT_URL}/profile/${username}`;

      const user = new User({ name, email, password, profile, username });
      user.save((err, user) => {
        if (err) {
          return res.status(401).json({
            error: errorHandler(err),
          });
        }
        return res.json({
          message: "Signup success! Please signin",
        });
      });
    });
  } else {
    return res.json({
      message: "Something went wrong. Try again",
    });
  }
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  // check if user already exists
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "this email does not exist.",
      });
    }
    // authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password do not match.",
      });
    }

    // generate a token and send to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // save response in cookie
    res.cookie("token", token, { expiresIn: "1d" });
    const { _id, username, name, email, role } = user;
    return res.json({
      token,
      user: { _id, username, name, email, role },
    });
  });
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Logout Success",
  });
};

// require signin test middleware
exports.requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

exports.authMiddleWare = (req, res, next) => {
  const authUserId = req.auth._id;
  // query the database and find user
  // --> make it available in the request.profile object
  User.findById({ _id: authUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    // execute next callback function so it can be used as a middleware
    next();
  });
};

exports.adminMiddleWare = (req, res, next) => {
  const adminUserId = req.auth._id;
  User.findById({ _id: adminUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    // check if admin
    // 0: default, 1 = admin
    if (user.role !== 1) {
      return res.status(400).json({
        error: "Admin resource. Access denied",
      });
    }
    req.profile = user;
    next();
  });
};

// auth user can update / delete own blog
exports.canUpdateAndDeleteBlog = (req, res, next) => {
  const slug = req.params.slug.toLowerCase();

  Blog.findOne({ slug }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    let authorizedUser =
      data.postedBy._id.toString() === req.profile._id.toString();

    if (!authorizedUser) {
      return res.status(400).json({
        error: "Unauthorized",
      });
    }
    next();
  });
};

// password resets
exports.forgotPass = (req, res) => {
  const { email } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: "User with that email does not exist",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASS, {
      expiresIn: "10m",
    });

    const params = forgotPass(email, token);

    // email token to user
    const sendEmailOnForgot = ses.sendEmail(params).promise();

    return user.updateOne({ resetPasswordLink: token }, (err, success) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      } else {
        sendEmailOnForgot
          .then((data) => {
            console.log("email submitted to SES", data);
            // res.send("email sent");
            res.json({
              message: `email has been sent to: ${email}, follow email instructions to complete reset your password`,
            });
          })
          .catch((err) => {
            console.log("ses email on pass reset", err);
            res.json({
              err: "Email could not be sent.",
            });
          });
      }
    });
  });
};

exports.resetPass = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;
  // check reset password link
  if (resetPasswordLink) {
    jwt.verify(
      // check token expiration (10 minutes)
      resetPasswordLink,
      process.env.JWT_RESET_PASS,
      (err, decoded) => {
        if (err) {
          return res.status(401).json({
            error: "Expired link. Try again",
          });
        }
        // find the user based on reset password link
        User.findOne({ resetPasswordLink }, (err, user) => {
          if (err || !user) {
            return res.status(401).json({
              error: "Something went wrong. Try later",
            });
          }
          // update user fields with new info
          const updatedFields = {
            password: newPassword,
            resetPasswordLink: "",
          };

          // update fields that have changed with lodash
          user = _.extend(user, updatedFields);

          // save updated user info
          user.save((err, result) => {
            if (err) {
              return res.status(401).json({
                error: errorHandler(err),
              });
            }

            res.json({
              message: `Password has been updated`,
            });
          });
        });
      }
    );
  }
};
