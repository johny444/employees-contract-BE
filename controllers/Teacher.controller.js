var dbConn = require("../config/db.config");

exports.getTeacherList = (req, res) => {
  //console.log('here all employees list');
  try {
    dbConn.query("SELECT * FROM Teacher", (err, rows, fields) => {
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
exports.getTeacherbyID = (req, res) => {
  //console.log('here all employees list')

  try {
    dbConn.query(
      "SELECT * FROM Teacher WHERE idTeacher = ?",
      [req.params.id],
      (err, rows, fields) => {
        if (!err) res.send(rows);
        else
          res
            .status(404)
            .send({ message: "Not found Teacher with id " + rows });
      }
    );
  } catch (error) {
    res.status(404).send({
      message: `Cannot get Teacher with id=${req.params.id}. Maybe Teacher was not found!`,
      Error: err,
    });
  }
};
exports.CreateTeacher = (req, res) => {
  const { teacher_name, teacher_email, teacher_password, LSH } = req.body;
  try {
    dbConn.query(
      "INSERT INTO Teacher(teacher_name,teacher_email,teacher_password,LSH) VALUES(?, ?, ?,?)",
      [teacher_name, teacher_email, teacher_password, LSH],
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
exports.DeleteTeacher = (req, res) => {
  try {
    dbConn.query(
      "DELETE FROM Teacher WHERE idTeacher = ?",
      [req.params.id],
      (err, rows, fields) => {
        if (!err)
          res.send({
            message: `Delete id=${req.params.id} successfully!`,
          });
        else {
          res.status(404).send({
            message: `Cannot delete Teacher with id=${req.params.id}. Maybe Teacher was not found!`,
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
exports.UpdateTeacher = (req, res) => {
  const { teacher_name, teacher_email, teacher_password, LSH } = req.body;
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
    dbConn.query(
      "UPDATE Teacher SET teacher_name=?,teacher_email=?,teacher_password=?,LSH=? WHERE idTeacher = ?",
      [teacher_name, teacher_email, teacher_password, LSH, req.params.id],
      (err, rows, fields) => {
        if (!err)
          res.send({
            message: `Update id=${req.params.id} successfully!`,
            data: req.body,
          });
        else {
          res.status(404).send({
            message: `Cannot Update Teacher with id=${req.params.id}. Maybe Teacher was not found!`,
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
