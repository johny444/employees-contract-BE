const express = require("express");
const router = express.Router();
const ResultController = require("../Query/Result");
//Get Result(s)
router.post("/", ResultController.CRUDRESULT);

module.exports = router;
