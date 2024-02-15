const express = require("express");
const router = express.Router();
const teacherCallController = require("../controllers/TeacherCall.controller");
//Get Teacher(s)
// router.get("/", teacherController.getTeacherList);
// router.get("/:id", teacherController.getTeacherbyID);
router.post("/", teacherCallController.TeacherExcecute);
// router.put("/:id", teacherController.UpdateTeacher);
// router.delete("/:id", teacherController.DeleteTeacher);

module.exports = router;
