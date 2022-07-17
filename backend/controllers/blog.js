const Blog = require("../models/Blog");
const Category = require("../models/Category");
const Tag = require("../models/Tag");
const formidable = require("formidable");
const slugify = require("slugify");
const _ = require("lodash");
const stripHtml = require("string-strip-html");
const fs = require("fs");
const { errorHandler } = require("../utils/dbErrorHandler");
const { textTrim } = require("../utils/trim");

exports.createBlog = (req, res) => {
  // get all form data
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    const { title, body, categories, tags } = fields;

    // create new blog
    let blog = new Blog();
    blog.title = title;
    blog.body = body;
    blog.excerpt = textTrim(body, 250, " ", "...");
    blog.slug = slugify(title).toLowerCase();
    blog.metatitle = `${title} - ${process.env.APP_NAME}`;
    blog.metadescription = stripHtml(body.substring(0, 160));
    blog.postedBy = req.auth._id;
    // categories and tags comma separated arrays
    let catsArray = categories && categories.split(",");
    let tagsArray = tags && tags.split(",");

    // handle file uploads
    if (files.photo) {
      if (files.photo.size > 500000) {
        return res.status(400).json({
          error: "Image should be less than 0.5MB in size",
        });
      }
      blog.photo.data = fs.readFileSync(files.photo.filepath);
      blog.photo.contentType = files.photo.mimetype;
    }

    // blog field validators
    if (!title || !title.length) {
      return res.status(400).json({
        error: "Title is a required field",
      });
    }

    // body at least 200 characters long
    if (!body || body.length < 200) {
      return res.status(400).json({
        error: "Blog content is too short",
      });
    }

    // categories and tags
    if (!categories || categories.length === 0) {
      return res.status(400).json({
        error: "A minimum of one category is required for the blog",
      });
    }

    if (!tags || tags.length === 0) {
      return res.status(400).json({
        error: "A minimum of one tag is required for the blog",
      });
    }

    // handle categories and tags arrays

    // save the blog
    blog.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      // res.json(result);

      // find and update categories
      Blog.findByIdAndUpdate(
        // get id of recently saved blog
        result._id,
        // mongoose push method to send categories ids to proper field in the blog model
        { $push: { categories: catsArray } },
        // return updated data, blog with added categories
        { new: true }
      ).exec((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        } else {
          // Similarly, push and update tags
          Blog.findByIdAndUpdate(
            result._id,
            { $push: { tags: tagsArray } },
            { new: true }
          ).exec((err, result) => {
            if (err) {
              return res.stats(400).json({
                error: errorHandler(err),
              });
            } else {
              res.json(result);
            }
          });
        }
      });
    });
  });
};
