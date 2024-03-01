const express = require("express");
const router = express.Router();
const ExamController = require("../Query/Exam");
//Get Exam(s)
// router.get("/", ExamController.getExamList);
// router.get("/:id", ExamController.getExambyID);
router.post("/", ExamController.CRUDEXAM);
// router.put("/:id", ExamController.UpdateExam);
// router.delete("/:id", ExamController.DeleteExam);

module.exports = router;
