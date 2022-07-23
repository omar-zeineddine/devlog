const express = require("express");
const router = express.Router();

// validators
const { runValidation } = require("../validators");
const { contactFormValidator } = require("../validators/form");

router.post("/contact", contactFormValidator, runValidation);

module.exports = router;
