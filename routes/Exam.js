const express = require("express");
const router = express.Router();
const ExamController = require("../controllers/Exam.controller");
//Get Exam(s)
// router.get("/", ExamController.getExamList);
// router.get("/:id", ExamController.getExambyID);
router.post("/", ExamController.ExamExcecute);
// router.put("/:id", ExamController.UpdateExam);
// router.delete("/:id", ExamController.DeleteExam);

module.exports = router;
