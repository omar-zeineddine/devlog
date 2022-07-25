const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  logout,
  requireSignin,
  forgotPass,
  resetPass,
} = require("../controllers/auth");

// validators
const { runValidation } = require("../validators");
const {
  userSignupValidator,
  userSigninValidator,
} = require("../validators/auth");

router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/signin", userSigninValidator, runValidation, signin);
router.get("/logout", logout);
router.put("/forgot-pass", forgotPassValidator, runValidation, forgotPassword);
router.get("/reset-pass", resetPassValidator, runValidation, resetPassword);

// test middleware for logged in user
router.get("/secret", requireSignin, (req, res) => {
  res.json({
    user: req.auth,
  });
});

module.exports = router;
