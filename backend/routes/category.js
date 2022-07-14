const express = require("express");
const router = express.Router();
const {
  createCategory,
  getCategories,
  getCategory,
  removeCategory,
} = require("../controllers/category");

// validators
const { runValidation } = require("../validators");
const { createCategoryValidator } = require("../validators/category");
const { requireSignin, adminMiddleWare } = require("../controllers/auth");

// admin only can create a new category
router.post(
  "/category",
  createCategoryValidator,
  runValidation,
  requireSignin,
  adminMiddleWare,
  createCategory
);

router.get("/categories", getCategories);
// slug instead of id for SEO
router.get("/category/:slug", getCategory);
router.delete("/category/:slug", removeCategory);

module.exports = router;
