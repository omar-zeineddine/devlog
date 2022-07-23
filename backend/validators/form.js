const { check } = require("express-validator");

// contact form field validator
exports.contactFormValidator = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("message")
    .not()
    .isEmpty()
    .isLength({ min: 30 })
    .withMessage("Message must be at least 30 characters long"),
];
