const Blog = require("../models/Blog");
const Category = require("../models/Category");
const Tag = require("../models/Tag");
const formidable = require("formidable");
const slugify = require("slugify");
const _ = require("lodash");
const fs = require("fs");
const { stripHtml } = require("string-strip-html");
const { errorHandler } = require("../utils/dbErrorHandler");

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
    blog.slug = slugify(title).toLowerCase();
    blog.metatitle = `${title} - ${process.env.APP_NAME}`;
    blog.postedBy = req.auth._id;

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

    // save the blog
    blog.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};
