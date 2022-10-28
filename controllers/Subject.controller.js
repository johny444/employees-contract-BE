var dbConn = require("../config/db.config");

exports.getSubjectList = (req, res) => {
  //console.log('here all employees list');
  try {
    dbConn.query("SELECT * FROM Subject", (err, rows, fields) => {
      if (!err) {
        console.log("first", rows);

        res.send({ message: "Get data successfully!", data: rows });
        // res.send(rows);
      } else console.log(err);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};
exports.getSubjectbyID = (req, res) => {
  //console.log('here all employees list')

  try {
    dbConn.query(
      "SELECT * FROM Subject WHERE idSubject = ?",
      [req.params.id],
      (err, rows, fields) => {
        if (!err) res.send(rows);
        else
          res
            .status(404)
            .send({ message: "Not found Subject with id " + rows });
      }
    );
  } catch (error) {
    console.log("hellosssssssssssss");

    res.status(500).send({ message: "Error retrieving Subject with id=" + id });
  }
};
exports.CreateSubject = (req, res) => {
  const { subject_name, Class, amount } = req.body;
  try {
    dbConn.query(
      "INSERT INTO Subject(subject_name, Class, amount) VALUES(?, ?, ?)",
      [subject_name, Class, amount],
      (err, rows, fields) => {
        if (!err) res.send({ message: "Create successfully!", data: req.body });
        else
          res.status(404).send({
            message: "Error while inserting a user into the database",
            Error: err,
          });
      }
    );
  } catch (error) {
    console.log("ERROR", error);

    res.send({ message: `${error}` });
  }
};
exports.DeleteSubject = (req, res) => {
  try {
    dbConn.query(
      "DELETE FROM Subject WHERE idSubject = ?",
      [req.params.id],
      (err, rows, fields) => {
        if (!err)
          res.send({
            message: `Delete id=${req.params.id} successfully!`,
          });
        else {
          res.status(404).send({
            message: `Cannot delete Subject with id=${req.params.id}. Maybe Subject was not found!`,
            Error: err,
          });
        }
      }
    );
  } catch (error) {
    console.log("ERROR", error);

    res.send({ message: `${error}` });
  }
};
exports.UpdateSubject = (req, res) => {
  const { subject_name, Class, amount } = req.body;
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
    dbConn.query(
      "UPDATE Subject SET subject_name=?,Class=?,amount=? WHERE idSubject = ?",
      [subject_name, Class, amount, req.params.id],
      (err, rows, fields) => {
        if (!err)
          res.send({
            message: `Update id=${req.params.id} successfully!`,
            data: req.body,
          });
        else {
          res.status(404).send({
            message: `Cannot Update Subject with id=${req.params.id}. Maybe Subject was not found!`,
            Error: err,
          });
        }
      }
    );
  } catch (error) {
    console.log("ERROR", error);

    res.send({ message: `${error}` });
  }
};
