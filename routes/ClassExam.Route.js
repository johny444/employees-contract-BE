const express = require("express");
const router = express.Router();
const ClassExamController = require("../Query/ClassExam");
//Get ClassExam(s)

router.post("/", ClassExamController.CRUDCLASSEXAM);

module.exports = router;
