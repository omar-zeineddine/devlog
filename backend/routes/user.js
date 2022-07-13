const express = require("express");
const router = express.Router();
const { requireSignin, authMiddleWare } = require("../controllers/auth");
const { read } = require("../controllers/user");

router.get("/user/profile", requireSignin, authMiddleWare, read);

module.exports = router;
