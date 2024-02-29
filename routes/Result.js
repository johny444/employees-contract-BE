const express = require("express");
const router = express.Router();
const ResultController = require("../controllers/Result.controller");
//Get Result(s)
router.post("/", ResultController.ResultExcecute);

module.exports = router;
