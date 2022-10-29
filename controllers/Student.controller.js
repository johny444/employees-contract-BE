var dbConn = require("../config/db.config");

exports.getStudentList = (req, res) => {
  //console.log('here all employees list');
  try {
    dbConn.query("SELECT * FROM Student", (err, rows, fields) => {
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
exports.getStudentbyID = (req, res) => {
  //console.log('here all employees list')

  try {
    dbConn.query(
      "SELECT * FROM Student WHERE idStudent = ?",
      [req.params.id],
      (err, rows, fields) => {
        if (!err) res.send(rows);
        else
          res
            .status(404)
            .send({ message: "Not found Student with id " + rows });
      }
    );
  } catch (error) {
    console.log("hellosssssssssssss");

    res.status(500).send({ message: "Error retrieving Student with id=" + id });
  }
};
exports.CreateStudent = (req, res) => {
  const { STD_Name, STD_Password, MSSV, LSH, idsubject } = req.body;
  try {
    dbConn.query(
      "INSERT INTO Student(STD_Name,STD_Password,MSSV,LSH,idsubject) VALUES(?, ?, ?,?,?)",
      [STD_Name, STD_Password, MSSV, LSH, idsubject],
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
exports.DeleteStudent = (req, res) => {
  try {
    dbConn.query(
      "DELETE FROM Student WHERE idStudent = ?",
      [req.params.id],
      (err, rows, fields) => {
        if (!err)
          res.send({
            message: `Delete id=${req.params.id} successfully!`,
          });
        else {
          res.status(404).send({
            message: `Cannot delete Student with id=${req.params.id}. Maybe Student was not found!`,
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
exports.UpdateStudent = (req, res) => {
  const { STD_Name, STD_Password, MSSV, LSH, idsubject } = req.body;
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
    dbConn.query(
      "UPDATE Student SET STD_Name=?,STD_Password=?,MSSV=?,LSH=? ,idsubject=? WHERE idStudent = ?",
      [STD_Name, STD_Password, MSSV, LSH, idsubject, req.params.id],
      (err, rows, fields) => {
        if (!err)
          res.send({
            message: `Update id=${req.params.id} successfully!`,
            data: req.body,
          });
        else {
          res.status(404).send({
            message: `Cannot Update Student with id=${req.params.id}. Maybe Student was not found!`,
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
