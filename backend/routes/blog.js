const express = require("express");
const router = express.Router();
const {
  createBlog,
  getBlog,
  getBlogs,
  getAllBlogsCategoriesAndTags,
  updateBlog,
  removeBlog,
  getPhoto,
} = require("../controllers/blog");
const { requireSignin, adminMiddleWare } = require("../controllers/auth");

router.post("/blog", requireSignin, adminMiddleWare, createBlog);

// get single blog
router.get("/blog/:slug", getBlog);

// get all blogs
router.get("/blogs", getBlogs);
// get all blogs (use post method - pass additional queries)
router.post("/blogs-categories-tags", getAllBlogsCategoriesAndTags);

// get blog image
router.get("/blog/photo/:slug", getPhoto);

// update
router.put("/blog/:slug", requireSignin, adminMiddleWare, updateBlog);

// delete
router.delete("/blog/:slug", requireSignin, adminMiddleWare, removeBlog);

module.exports = router;
