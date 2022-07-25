const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  logout,
  requireSignin,
  forgotPass,
} = require("../controllers/auth");

// validators
const { runValidation } = require("../validators");
const {
  userSignupValidator,
  userSigninValidator,
  forgotPassValidator,
} = require("../validators/auth");

router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/signin", userSigninValidator, runValidation, signin);
router.get("/logout", logout);
router.put("/forgot-pass", forgotPassValidator, runValidation, forgotPass);

// test middleware for logged in user
router.get("/secret", requireSignin, (req, res) => {
  res.json({
    user: req.auth,
  });
});

module.exports = router;
