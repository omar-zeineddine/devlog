const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

// AWS S3 bucket settings
const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

exports.createBlog = (req, res) => {
  // get all form data

  const { title, body } = req.body;

  const base64Data = new Buffer.from(
    image.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const type = image.split(";")[0].split("/")[1];

  // create new blog
  let blog = new Blog();
  blog.title = title;
  blog.body = body;
  // blog.excerpt = textTrim(body, 250, " ", "...");
  // blog.slug = slugify(title).toLowerCase();
  // blog.metatitle = `${title} - ${process.env.APP_NAME}`;
  // blog.metadescription = stripHtml(body.substring(0, 160));
  // blog.postedBy = req.auth._id;
  // categories and tags comma separated arrays
  // let catsArray = categories && categories.split(",");
  // let tagsArray = tags && tags.split(",");

  // handle file uploads
  // if (files.photo) {
  //   if (files.photo.size > 500000) {
  //     return res.status(400).json({
  //       error: "Image should be less than 0.5MB in size",
  //     });
  //   }
  //   // blog.photo.data = fs.readFileSync(files.photo.filepath);
  //   // blog.photo.contentType = files.photo.mimetype;
  // }

  // handle image uploads
  if (photo.size > 500000) {
    return res.status(400).json({
      error: "Image should be less than 0.5 MB",
    });
  }
  // Read content from the file

  // upload to s3 bucket
  const params = {
    Bucket: "s3-devlog-admin",
    Key: `blog/${uuidv4()}.${type}`,
    Body: base64Data,
    ACL: "public-read",
    ContentEncoding: "base64",
    ContentType: `image/${type}`,
  };

  s3.upload(params, function (err, data) {
    if (err) {
      console.log(err);
      res.status(400).json({ error: "upload to s3 failed" });
    }
    console.log("aws s3 res data", data);
    blog.photo.url = data.Location; // get image url
    blog.photo.key = data.Key; // get image key
  });

  // // save the blog
  blog.save((err, result) => {
    if (err) {
      return res.status(400).json({
        // error: errorHandler(err),
        error: "duplicate content",
      });
    }
  });
};

exports.createBlog = (req, res) => {
  let form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    const { title, body, categories, tags } = fields;
    const { photo } = files;

    let blog = new Blog({ title, body });
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

    if (photo.size > 500000) {
      return res.status(400).json({
        error: "Image should be less than 0.5 MB",
      });
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

    const params = {
      Bucket: "s3-devlog-admin",
      Key: `blog/${uuidv4()}`,
      Body: fs.readFileSync(photo.filepath),
      ACL: "public-read",
      ContentType: `image/jpg`,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).json({ error: "Upload to s3 failed" });
      }
      console.log("AWS UPLOAD RES DATA", data);
      blog.photo.url = data.Location;
      blog.photo.key = data.Key;

      // save to db
      blog.save((err, success) => {
        if (err) {
          console.log(err);
          res.status(400).json({ error: "Duplicate blog" });
        }
        // return res.json(success);
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
  });
};
