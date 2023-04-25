const express = require("express");
const { login, verifyToken } = require("../controller/auth");
const router = express.Router();
// following are the routes which we used to expose the  backend service
router.post("/login", login);
router.post("/verify", verifyToken);

module.exports = router;
