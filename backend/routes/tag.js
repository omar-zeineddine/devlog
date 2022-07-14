const express = require("express");
const router = express.Router();

// controllers
const { createTag, getTags, getTag, removeTag } = require("../controllers/tag");

// validators
const { runValidation } = require("../validators");
const { createTagValidator } = require("../validators/tag");
const { requireSignin, adminMiddleWare } = require("../controllers/auth");

router.post(
  "/tag",
  createTagValidator,
  runValidation,
  requireSignin,
  adminMiddleWare,
  createTag
);
router.get("/tags", getTags);
router.get("/tag/:slug", getTag);
router.delete("/tag/:slug", requireSignin, adminMiddleWare, removeTag);

module.exports = router;
