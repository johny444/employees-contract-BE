var dbConn = require("../config/db.config");

exports.getExamList = (req, res) => {
  //console.log('here all employees list');
  try {
    dbConn.query("SELECT * FROM exam", (err, rows, fields) => {
      if (!err) {
        console.log("first", rows);

        res.send({ message: "Get dat successfully!", data: rows });
        // res.send(rows);
      } else console.log(err);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};
exports.getExambyID = (req, res) => {
  //console.log('here all employees list');
  console.log("first", req.params.id);

  try {
    dbConn.query(
      "SELECT * FROM exam WHERE idexam = ?",
      [req.params.id],
      (err, rows, fields) => {
        if (!err) res.send(rows);
        else
          res.status(404).send({ message: "Not found Exam with id " + rows });
      }
    );
  } catch (error) {
    res.status(500).send({ message: "Error retrieving Exam with id=" + id });
  }
};
exports.CreateExam = (req, res) => {
  const { exam_desc, exam_totalQuestion, time, idsubject, idteacher } =
    req.body;
  try {
    dbConn.query(
      "INSERT INTO exam(exam_desc, exam_totalQuestion, time,idsubject,idteacher) VALUES(?, ?, ?,?, ?)",
      [exam_desc, exam_totalQuestion, time, idsubject, idteacher],
      (err, rows, fields) => {
        if (!err) res.send({ message: "Create successfully!", data: req.body });
        else
          res.status(404).send({
            message: "Error while inserting a user into the database",
          });
      }
    );
  } catch (error) {
    res.json({ message: error });
  }
};
exports.DeleteExam = (req, res) => {
  try {
    dbConn.query(
      "DELETE FROM exam WHERE idexam = ?",
      [req.params.id],
      (err, rows, fields) => {
        if (!err)
          res.send({
            message: `Delete id=${req.params.id} successfully!`,
          });
        else {
          res.status(404).send({
            message: `Cannot delete Exam with id=${req.params.id}. Maybe Exam was not found!`,
            Error: err,
          });
        }
      }
    );
  } catch (error) {
    console.log("catch");

    res.json({ message: error });
  }
};
exports.UpdateExam = (req, res) => {
  const { exam_desc, exam_totalQuestion, time, idsubject, idteacher } =
    req.body;
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
    dbConn.query(
      "UPDATE exam SET exam_desc=?,exam_totalQuestion=?,time=?,idsubject=? ,idteacher=? WHERE idexam = ?",
      [
        exam_desc,
        exam_totalQuestion,
        time,
        idsubject,
        idteacher,
        req.params.id,
      ],
      (err, rows, fields) => {
        if (!err)
          res.send({
            message: `Update id=${req.params.id} successfully!`,
            data: req.body,
          });
        else {
          res.status(404).send({
            message: `Cannot Update Exam with id=${req.params.id}. Maybe Exam was not found!`,
            Error: err,
          });
        }
      }
    );
  } catch (error) {
    console.log("catch");

    res.json({ message: error });
  }
};
