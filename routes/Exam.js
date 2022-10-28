const express = require("express");
const router = express.Router();
const examController = require("../controllers/Exam.controller");
//Get Exam(s)
router.get("/", examController.getExamList);

//GET Exam
// router.get("/:id", async (req, res) => {
//   const id = req.params.id;

//   Exam.findById(id)
//     .then((data) => {
//       if (!data)
//         res.status(404).send({ message: "Not found Exam with id " + id });
//       else res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({ message: "Error retrieving Exam with id=" + id });
//     });
// });
router.get("/:id", examController.getExambyID);

router.post("/", examController.CreateExam);
// router.post("/", (req, res) => {
//   const exam = new Exam({
//     exam_desc: req.body.exam_desc,
//     exam_totalQuestion: req.body.exam_totalQuestion,
//     exam_passMarks: req.body.exam_passMarks,
//     time: req.body.time,
//   });
//   exam
//     .save()
//     .then((data) => {
//       res.json(data);
//       //   console.log("data post", data);
//     })
//     .catch((e) => {
//       res.json({ message: e });
//     });
// });

// router.put("/:id", (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: "Data to update can not be empty!",
//     });
//   }

//   const id = req.params.id;

//   Exam.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//     .then((data) => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot update Exam with id=${id}. Maybe Exam was not found!`,
//         });
//       } else res.send({ message: "Exam was updated successfully." });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Error updating Exam with id=" + id,
//       });
//     });
// });
router.put("/:id", examController.UpdateExam);

// router.delete("/:id", (req, res) => {
//   const id = req.params.id;
//   //   console.log("id", id);
//   Exam.findByIdAndRemove(id)
//     .then((data) => {
//       //   console.log("delete", data);
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot delete Exam with id=${id}. Maybe Exam was not found!`,
//         });
//       } else {
//         res.send({
//           message: "Exam was deleted successfully!",
//         });
//       }
//     })
//     .catch((e) => {
//       //   res.json({ message: e });
//       res.status(500).send({
//         message: "Could not delete Exam with id=" + id,
//       });
//     });
// });
router.delete("/:id", examController.DeleteExam);

module.exports = router;
