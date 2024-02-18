const express = require("express");
const router = express.Router();
const studentController = require("../controllers/Student.controller");
//Get Student(s)
// router.get("/", studentController.getStudentList);
// router.get("/:id", studentController.getStudentbyID);
router.post("/", studentController.StudentExcecute);
// router.put("/:id", studentController.UpdateStudent);
// router.delete("/:id", studentController.DeleteStudent);

module.exports = router;
