const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/Teacher.controller");
//Get Teacher(s)
router.get("/", teacherController.getTeacherList);
router.get("/:id", teacherController.getTeacherbyID);
router.post("/", teacherController.CreateTeacher);
router.put("/:id", teacherController.UpdateTeacher);
router.delete("/:id", teacherController.DeleteTeacher);

module.exports = router;
