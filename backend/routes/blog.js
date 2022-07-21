const express = require("express");
const router = express.Router();
const {
  createBlog,
  getBlog,
  getBlogs,
  getAllBlogsCategoriesAndTags,
  getRelatedBlogs,
  updateBlog,
  removeBlog,
  getPhoto,
  blogSearch,
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

// get relate blog (use post method - pass additional queries)
router.post("/blogs/related", getRelatedBlogs);

// update
router.put("/blog/:slug", requireSignin, adminMiddleWare, updateBlog);

// delete
router.delete("/blog/:slug", requireSignin, adminMiddleWare, removeBlog);

// search blogs
router.get("/blogs/search", blogSearch);

module.exports = router;
