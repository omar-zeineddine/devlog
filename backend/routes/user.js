const express = require("express");
const router = express.Router();
const { requireSignin, authMiddleWare } = require("../controllers/auth");
const {
  read,
  publicProfile,
  updateProfile,
  uploadProfilePhoto,
} = require("../controllers/user");

router.get("/user/profile", requireSignin, authMiddleWare, read);
router.get("/user/:username", publicProfile);
router.put("/user/update", requireSignin, authMiddleWare, updateProfile);
router.get("/user/photo/:username", uploadProfilePhoto);

module.exports = router;
