const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      min: 3,
      max: 160,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    body: {
      type: {},
      required: true,
      min: 200,
      max: 2000000,
    },
    excerpt: {
      type: String,
      max: 1000,
    },
    metatitle: {
      type: String,
    },
    metadescription: {
      type: String,
    },
    photo: {
      data: Buffer,
      contentType: String,
      // aws s3
      // url: String,
      // key: String,
    },
    // array of categories --> points to category model
    categories: [{ type: ObjectId, ref: "Category", require: true }],
    tags: [{ type: ObjectId, ref: "Tag", require: true }],
    // reference blog author
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema);
