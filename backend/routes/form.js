const express = require("express");
const router = express.Router();
const { contactForm, contactBlogAuthor } = require("../controllers/form");

// validators
const { runValidation } = require("../validators");
const { contactFormValidator } = require("../validators/form");

router.post("/contact", contactFormValidator, runValidation, contactForm);
router.post(
  "/contact-author",
  contactFormValidator,
  runValidation,
  contactBlogAuthor
);

module.exports = router;
