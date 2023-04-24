const express = require("express");
const {
  register,
  insert,
  get,
  enrollAdmin,
  addQueue,
} = require("../controller/blockchainController");
const { login } = require("../controller/auth");

const router = express.Router();
// following are the routes which we used to expose the  backend service
router.post("/enrollAdmin", verify, enrollAdmin);
router.post("/register", verify, register);
router.post("/addQueue", verify, addQueue);
router.post("/insert", verify, insert);
router.post("/get", verify, get);

module.exports = router;
