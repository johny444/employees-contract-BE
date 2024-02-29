const express = require("express");
const router = express.Router();
const test = require("../Query/Teacher");

router.post("/", test.GetTest);

module.exports = router;
