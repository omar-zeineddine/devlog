const User = require("../models/User");
const Blog = require("../models/Blog");
const { errorHandler } = require("../utils/dbErrorHandler");

exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.publicProfile = (req, res) => {
  let { username } = req.params;
  let user;

  User.findOne({ username }).exec((err, userFromDB) => {
    if (err || !userFromDB) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    user = userFromDB;
    let userId = user._id;

    Blog.find({ postedBy: userId })
      .populate("categories", "_id name slug")
      .populate("tags", "_id name slug")
      .populate("postedBy", "_id name")
      .limit(10)
      .select(
        "_id title slug excerpt categories tags postedBy createdAt updatedAt"
      )
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        // return without photo, hash, and salt
        user.photo = undefined;
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json({
          user,
          blogs: data,
        });
      });
  });
};
