const User = require("../models/User");
const shortId = require("shortid");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }
    const { name, email, password } = req.body;
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
