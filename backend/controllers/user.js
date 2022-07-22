const User = require("../models/User");
const Blog = require("../models/Blog");
const formidable = require("formidable");
const slugify = require("slugify");
const _ = require("lodash");
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

// update user profile
exports.updateProfile = (req, res) => {
  let form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "photo could not be uploaded",
      });
    }

    let user = req.profile;
    // merge changed fields into user
    user = _.extend(user, fields);

    // if there is any photo
    if (files.photo) {
      // prevent user from uploading photos bigger than 0.5 MB
      if (files.photo.size > 500000) {
        return res.status(400).json({
          error: "Image should be less than 0.5MB in size",
        });
      }

      blog.photo.data = fs.readFileSync(files.photo.filepath);
      blog.photo.contentType = files.photo.mimetype;

      user.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
      });
    }
  });
};

exports.uploadProfilePhoto = (req, res) => {
  const username = req.params.username;
  User.findOne({ username }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    if (user.photo.data) {
      res.set("Content-Type", user.photo.contentType);
      return res.send(user.photo.data);
    }
  });
};
