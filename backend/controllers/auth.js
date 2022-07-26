const User = require("../models/User");
const Blog = require("../models/Blog");
const shortId = require("shortid");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");
const { errorHandler } = require("../utils/dbErrorHandler");
const sendgridMail = require("@sendgrid/mail");
sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.signup = (req, res) => {
  const { name, email, password } = req.body;

  // check if user is found in db
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }

    // generate unique short ids
    let username = shortId.generate();
    let profile = `${process.env.CLIENT_URL}/profile/${username}`;

    let newUser = new User({ name, email, password, profile, username });
    newUser.save((err, success) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json({
        message: "User registered successfully!",
      });
    });
  });
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

    const emailData = {
      to: email,
      from: process.env.EMAIL_FROM,
      subject: "Password reset link",
      html: `
        <h4>Please use the following link to reset your password:</h4>
        <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
        <hr/>
        <p>This email may contain sensitive information</p>
    `,
    };

    return user.updateOne({ resetPasswordLink: token }, (err, success) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      } else {
        sendgridMail.send(emailData).then((sent) =>
          res.json({
            message: `
              Email has been sent to ${email}. 
              Follow password reset instructions. 
              `,
          })
        );
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
