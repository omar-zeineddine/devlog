const express = require("express");
const router = express.Router();
const {
  registerAws,
  initialSignup,
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
  forgotPassValidator,
  resetPassValidator,
} = require("../validators/auth");

router.post("/test-ses", registerAws);

router.post(
  "/initial-signup",
  userSignupValidator,
  runValidation,
  initialSignup
);
// router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/signup", signup);
router.post("/signin", userSigninValidator, runValidation, signin);
router.get("/logout", logout);
router.put("/forgot-pass", forgotPassValidator, runValidation, forgotPass);
router.put("/reset-pass", resetPassValidator, runValidation, resetPass);

// test middleware for logged in user
router.get("/secret", requireSignin, (req, res) => {
  res.json({
    user: req.auth,
  });
});

module.exports = router;
