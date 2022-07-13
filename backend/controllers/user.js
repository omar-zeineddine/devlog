const User = require("../models/User");

exports.read = (req, res) => {
  req.profile.hashed_password = unedfined;
  return res.json(req.profile);
};
