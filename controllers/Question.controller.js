var dbConn = require("../config/db.config");

exports.getQuestionList = (req, res) => {
  //console.log('here all employees list');
  try {
    dbConn.query("SELECT * FROM Question", (err, rows, fields) => {
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
exports.getQuestionbyID = (req, res) => {
  //console.log('here all employees list')

  try {
    dbConn.query(
      "SELECT * FROM Question WHERE idQuestion = ?",
      [req.params.id],
      (err, rows, fields) => {
        if (!err) res.send(rows);
        else
          res
            .status(404)
            .send({ message: "Not found Question with id " + rows });
      }
    );
  } catch (error) {
    console.log("hellosssssssssssss");

    res
      .status(500)
      .send({ message: "Error retrieving Question with id=" + id });
  }
};
exports.CreateQuestion = (req, res) => {
  const {
    question_name,
    option_one,
    option_two,
    option_three,
    option_four,
    answer,
  } = req.body;
  try {
    dbConn.query(
      "INSERT INTO Question(question_name,option_one,option_two,option_three,option_four,answer) VALUES(?, ?, ?,?,?,?)",
      [
        question_name,
        option_one,
        option_two,
        option_three,
        option_four,
        answer,
      ],
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
exports.DeleteQuestion = (req, res) => {
  try {
    dbConn.query(
      "DELETE FROM Question WHERE idQuestion = ?",
      [req.params.id],
      (err, rows, fields) => {
        if (!err)
          res.send({
            message: `Delete id=${req.params.id} successfully!`,
          });
        else {
          res.status(404).send({
            message: `Cannot delete Question with id=${req.params.id}. Maybe Question was not found!`,
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
exports.UpdateQuestion = (req, res) => {
  const {
    question_name,
    option_one,
    option_two,
    option_three,
    option_four,
    answer,
  } = req.body;
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
    dbConn.query(
      "UPDATE Question SET question_name=?,option_one=?,option_two=?,option_three=?,option_four=?,answer=? WHERE idQuestion = ?",
      [
        question_name,
        option_one,
        option_two,
        option_three,
        option_four,
        answer,
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
            message: `Cannot Update Question with id=${req.params.id}. Maybe Question was not found!`,
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
