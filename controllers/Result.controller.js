var dbConn = require("../config/db.config");

exports.getResultList = (req, res) => {
  //console.log('here all employees list');
  try {
    dbConn.query("SELECT * FROM Result", (err, rows, fields) => {
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
exports.getResultbyID = (req, res) => {
  //console.log('here all employees list')

  try {
    dbConn.query(
      "SELECT * FROM Result WHERE idResult = ?",
      [req.params.id],
      (err, rows, fields) => {
        if (!err) res.send(rows);
        else
          res.status(404).send({ message: "Not found Result with id " + rows });
      }
    );
  } catch (error) {
    console.log("hellosssssssssssss");

    res.status(500).send({ message: "Error retrieving Result with id=" + id });
  }
};
exports.CreateResult = (req, res) => {
  const { status, correctAnswer, marks, idstudent, idexam } = req.body;
  try {
    dbConn.query(
      "INSERT INTO Result(status,correctAnswer,marks,idstudent,idexam) VALUES(?, ?, ?,?,?)",
      [status, correctAnswer, marks, idstudent, idexam],
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
exports.DeleteResult = (req, res) => {
  try {
    dbConn.query(
      "DELETE FROM Result WHERE idResult = ?",
      [req.params.id],
      (err, rows, fields) => {
        if (!err)
          res.send({
            message: `Delete id=${req.params.id} successfully!`,
          });
        else {
          res.status(404).send({
            message: `Cannot delete Result with id=${req.params.id}. Maybe Result was not found!`,
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
exports.UpdateResult = (req, res) => {
  const { status, correctAnswer, marks, idstudent, idexam } = req.body;
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
    dbConn.query(
      "UPDATE Result SET status=?,correctAnswer=?,marks=?,idstudent=?,idexam=? WHERE idResult = ?",
      [status, correctAnswer, marks, idstudent, idexam, req.params.id],
      (err, rows, fields) => {
        if (!err)
          res.send({
            message: `Update id=${req.params.id} successfully!`,
            data: req.body,
          });
        else {
          res.status(404).send({
            message: `Cannot Update Result with id=${req.params.id}. Maybe Result was not found!`,
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
