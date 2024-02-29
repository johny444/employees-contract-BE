const express = require("express");
const router = express.Router();
const ClassExamController = require("../controllers/ClassExam.controller");
//Get ClassExam(s)
// router.get("/", ClassExamController.getClassExamList);
// router.get("/:id", ClassExamController.getClassExambyID);
router.post("/", ClassExamController.ClassExamExcecute);
// router.put("/:id", ClassExamController.UpdateClassExam);
// router.delete("/:id", ClassExamController.DeleteClassExam);

module.exports = router;
