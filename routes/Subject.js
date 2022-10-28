const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/Subject.controller");
//Get Subject(s)
router.get("/", subjectController.getSubjectList);
router.get("/:id", subjectController.getSubjectbyID);
router.post("/", subjectController.CreateSubject);
router.put("/:id", subjectController.UpdateSubject);
router.delete("/:id", subjectController.DeleteSubject);

module.exports = router;
