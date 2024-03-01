const express = require("express");
const router = express.Router();
const QuestionController = require("../Query/Question");
//Get Question(s)
router.post("/", QuestionController.CRUDQUESTION);

module.exports = router;
