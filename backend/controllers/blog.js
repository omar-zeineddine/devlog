const User = require("../models/User");
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

// get single blog
exports.getBlog = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Blog.findOne({ slug })
    .populate("categories", "_id name slug")
    .populate("tags", "_id name slug")
    .populate("postedBy", "_id name username")
    // return body instead of excerpt
    .select(
      "_id title body slug metatitle metadescription categories tags postedBy createdBy updatedAt"
    )
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    });
};

exports.getBlogs = (req, res) => {
  // pass empty object
  Blog.find({})
    // populate blog with associated cats, tags, and poster
    .populate("categories", "_id name slug")
    .populate("tags", "_id name slug")
    .populate("postedBy", "_id name username")
    // return the following fields without the photo
    .select(
      "_id title blog slug excerpt categories tags postedBy createdBy updatedAt"
    )
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    });
};

exports.getAllBlogsCategoriesAndTags = (req, res) => {
  // grab limit: number of blogposts to be sent on each request
  // get limit from frontend
  let limit = req.body.limit ? parseInt(req.body.limt) : 10; // set 10 as default limit
  let skip = req.body.skip ? parseInt(req.body.skip) : 0; // set default skip val to 0

  // initialize variables to be populated based on queries
  let blogs, categories, tags;

  Blog.find({})
    .populate("categories", "_id name username slug")
    .populate("tags", "_id name slug")
    .populate("postedBy", "_id name username profile")
    // return the latest blogs first
    .sort({ createdAt: -1 })
    .limit(limit)
    .select(
      "_id title slug excerpt categories tags postedBy createdAt updatedAt"
    )
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: errorHandler(err),
        });
      }
      blogs = data; // all blogs
      // get all categories
      Category.find({}).exec((err, cat) => {
        if (err) {
          return res.json({
            error: errorHandler(err),
          });
        }
        categories = cat; // all categories

        // get all tags
        //
        Tag.find({}).exec((err, tag) => {
          if (err) {
            return res.json({
              error: errorHandler(err),
            });
          }
          tags = tag; // all categories

          // return all blogs cats and tags
          // return size -> for load more button
          res.json({ blogs, categories, tags, size: blogs.length });
        });
      });
    });
};

// delete
exports.removeBlog = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Blog.findOneAndRemove({ slug }).exec((err, data) => {
    if (err) {
      return res.json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "blog has been deleted",
    });
  });
};

// update blog:
exports.updateBlog = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Blog.findOne({ slug }).exec((err, oldBlog) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "Image could not be uploaded",
        });
      }

      let slugBeforeMerge = oldBlog.slug;

      // update changes, merge unchanged
      odBlog = _.merge(oldBlog, fields);

      // keep the old value of slug before merge
      oldBlog.slug = slugBeforeMerge;

      const { body, desc, categories, tags } = fields;

      // if body has changed, update the excerpt and meta description
      if (body) {
        oldBlog.excerpt = textTrim(body, 320, " ", " ...");
        oldBlog.metadescription = stripHtml(body.substring(0, 160));
      }

      // if categories have changed, perform update
      if (categories) {
        oldBlog.categories = categories.split(",");
      }

      // if tags have changed, perform update
      if (tags) {
        oldBlog.tags = tags.split(",");
      }

      // handle files
      if (files.photo) {
        if (files.photo.size > 10000000) {
          return res.status(400).json({
            error: "Image should be less than 1mb in size",
          });
        }
        oldBlog.photo.data = fs.readFileSync(files.photo.filepath);
        oldBlog.photo.contentType = files.photo.mimetype;
      }

      // save the updated blog
      oldBlog.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json(result);
      });
    });
  });
};

// fetch blog photo
exports.getPhoto = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Blog.findOne({ slug })
    .select("photo")
    .exec((err, blog) => {
      if (err || !blog) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.set("Content-Type", blog.photo.contentType);
      return res.send(blog.photo.data);
    });
};

// get related blogs
exports.getRelatedBlogs = (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 3;
  const { _id, categories } = req.body;

  // find all blogs, excluding the current blog, based on categories of the current blog
  Blog.find({ _id: { $ne: _id }, categories: { $in: categories } })
    .limit(limit)
    .populate("postedBy", "_id name username profile")
    // selected fields
    .select("title slug excerpt postedBy createdAt updatedAt")
    .exec((err, blogs) => {
      if (err) {
        return res.status(400).json({
          error: "Blogs not found",
        });
      }
      res.json(blogs);
    });
};

// search blogs
exports.blogSearch = (req, res) => {
  // send request query by the name of search
  const { search } = req.query;
  // find blog based on search string
  if (search) {
    // find blog based on blog title / body
    Blog.find(
      // https://www.mongodb.com/docs/manual/reference/operator/query/or/
      {
        $or: [
          // case insensitive
          { title: { $regex: search, $options: "i" } },
          { body: { $regex: search, $options: "i" } },
        ],
      },
      (err, blogs) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json(blogs);
      }
    ).select("-photo -body"); // return without body and photo
  }
};

// get blogs of auth users
exports.getUserBlogs = (req, res) => {
  User.findOne({ username: req.params.username }).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    Blog.find({ postedBy: user._id })
      .populate("categories", "_id name slug")
      .populate("tags", "_id name slug")
      .populate("postedBy", "_id name username")
      .select("_id title slug postedBy createdAt updatedAt")
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json(data);
      });
  });
};
