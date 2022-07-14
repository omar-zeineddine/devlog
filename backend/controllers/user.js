const User = require("../models/User");

exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  req.profile.role = undefined;
  return res.json(req.profile);
};
