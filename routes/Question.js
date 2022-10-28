const express = require("express");
const router = express.Router();
const questionController = require("../controllers/Question.controller");
//Get Question(s)
router.get("/", questionController.getQuestionList);
router.get("/:id", questionController.getQuestionbyID);
router.post("/", questionController.CreateQuestion);
router.put("/:id", questionController.UpdateQuestion);
router.delete("/:id", questionController.DeleteQuestion);

module.exports = router;
