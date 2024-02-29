const express = require("express");
const router = express.Router();
const test = require("../Query/TestPr");

router.post("/", test.GetTest);

module.exports = router;
