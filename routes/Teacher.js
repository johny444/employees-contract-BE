const express = require("express");
const Teacher = require("../models/teacher");
const router = express.Router();

//Get Teacher(s)
router.get("/", (req, res) => {
  Teacher.find()
    .then((data) => {
      res.json(data);
    })
    .catch((e) => {
      res.json({ message: e });
    });
});

//GET Teacher
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  Teacher.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Teacher with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Teacher with id=" + id });
    });
});

router.post("/", (req, res) => {
  const teacher = new Teacher({
    teacher_name: req.body.teacher_name,
    teacher_email: req.body.teacher_email,
    teacher_password: req.body.teacher_password,
    LSH: req.body.LSH,
  });
  teacher
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

  Teacher.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Teacher with id=${id}. Maybe Teacher was not found!`,
        });
      } else res.send({ message: "Teacher was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Teacher with id=" + id,
      });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  //   console.log("id", id);
  Teacher.findByIdAndRemove(id)
    .then((data) => {
      //   console.log("delete", data);
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Teacher with id=${id}. Maybe Teacher was not found!`,
        });
      } else {
        res.send({
          message: "Teacher was deleted successfully!",
        });
      }
    })
    .catch((e) => {
      //   res.json({ message: e });
      res.status(500).send({
        message: "Could not delete Teacher with id=" + id,
      });
    });
});

module.exports = router;
