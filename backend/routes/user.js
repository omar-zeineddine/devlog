const express = require("express");
const router = express.Router();
const {
  requireSignin,
  authMiddleWare,
  adminMiddleWare,
} = require("../controllers/auth");
const { read } = require("../controllers/user");

router.get("/profile", requireSignin, adminMiddleWare, read);

module.exports = router;
