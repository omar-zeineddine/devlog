const Category = require("../models/Category");
const slugify = require("slugify");
const { errorHandler } = require("../utils/dbErrorHandler");

// create
exports.createCategory = (req, res) => {
  const { name } = req.body;
  let slug = slugify(name).toLowerCase();

  let category = new Category({ name, slug });

  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

// Get all Categories
exports.getCategories = (req, res) => {
  Category.find({}).exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(categories);
  });
};

// Get a single Category
exports.getCategory = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Category.findOne({ slug }).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(category);
  });
};

// remove category
exports.removeCategory = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Category.findOneAndRemove({ slug }).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Category deleted successfully",
    });
  });
};
