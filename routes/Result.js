const express = require("express");
const Result = require("../models/result");
const router = express.Router();

//Get Result(s)
router.get("/", (req, res) => {
  Result.find()
    .then((data) => {
      res.json(data);
    })
    .catch((e) => {
      res.json({ message: e });
    });
});

//GET Result
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  Result.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Result with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Result with id=" + id });
    });
});

router.post("/", (req, res) => {
  const result = new Result({
    status: req.body.status,
    marks: req.body.marks,
    correctAnswer: req.body.correctAnswer,
  });
  result
    .save()
    .then((data) => {
      res.json(data);
      //   console.log("data post", data);
    })
    .catch((e) => {
      res.json({ message: e });
    });
});

router.put("/:id", (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Result.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Result with id=${id}. Maybe Result was not found!`,
        });
      } else res.send({ message: "Result was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Result with id=" + id,
      });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  //   console.log("id", id);
  Result.findByIdAndRemove(id)
    .then((data) => {
      //   console.log("delete", data);
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Result with id=${id}. Maybe Result was not found!`,
        });
      } else {
        res.send({
          message: "Result was deleted successfully!",
        });
      }
    })
    .catch((e) => {
      //   res.json({ message: e });
      res.status(500).send({
        message: "Could not delete Result with id=" + id,
      });
    });
});

module.exports = router;
