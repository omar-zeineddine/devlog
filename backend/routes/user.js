const express = require("express");
const router = express.Router();
const {
  requireSignin,
  authMiddleWare,
  adminMiddleWare,
} = require("../controllers/auth");
const { read, publicProfile } = require("../controllers/user");

router.get("/profile", requireSignin, adminMiddleWare, read);
router.get("/profile/:username", publicProfile);

module.exports = router;
