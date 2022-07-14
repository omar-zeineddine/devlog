const Tag = require("../models/Tag");
const slugify = require("slugify");
const { errorHandler } = require("../utils/dbErrorHandler");

// Create
exports.createTag = (req, res) => {
  const { name } = req.body;
  let slug = slugify(name).toLowerCase();

  let tag = new Tag({ name, slug });
  console.log(tag);

  tag.save((err, tagData) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(tagData);
  });
};

// get all tags
exports.getTags = (req, res) => {
  Tag.find({}).exec((err, tags) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(tags);
  });
};

// get single tag
exports.getTag = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Tag.findOne({ slug }).exec((err, tag) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(tag);
  });
};

// delete tag
exports.removeTag = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Tag.findOneAndRemove({ slug }).exec((err, tag) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ message: "Tag deleted successfully" });
  });
};
