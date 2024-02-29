const express = require("express");
const router = express.Router();
const QuestionController = require("../controllers/Question.controller");
//Get Question(s)
router.post("/", QuestionController.QuestionExcecute);

module.exports = router;
