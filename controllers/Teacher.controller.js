var dbConfig = require("../config/config");
const oracledb = require("oracledb");
// oracledb.autoCommit = true;
var connectionProperties = {
  user: dbConfig.USER || "system",
  password: dbConfig.PASSWORD || "oracle",
  connectString: dbConfig.CONNECTSTRING || "localhost/orcl",
};
const AutoCommit = () => {
  let opts = {};
  opts.autoCommit = true;
  return opts;
};
exports.getTeacherList = (req, res) => {
  //console.log('here all employees list');

  oracledb.getConnection(connectionProperties).then((dbConn) => {
    dbConn.execute("SELECT * FROM teacher", (err, data, fields) => {
      // dbConn.commit();
      // if (!err) {
      //   res.send({ message: "GET DATA SUCCESS!", data: data.rows });
      //   // res.send(rows);
      // } else console.log("errsssssssssss", err);
      try {
        console.log("data.rows", data.rows);
        if (!data.rows[0]) {
          console.log("Not found");
          throw {
            message: `NOT FOUND ANY DATA!`,
          };
        }
        var teacher = [];
        data.rows.forEach(function (v) {
          console.log("object", v);
          // teacher.push({
          //   id: v.id,
          //   name: v.name,
          // });
        });
        res
          .status(200)
          .json({ message: "GET DATA SUCCESS44!", data: data.rows });
      } catch (error) {
        res.status(404).send({
          MESSAGE: `Query Data Alert`,
          ERROR_DES: error,
        });
      }
    });
  });
};
exports.getTeacherbyID = (req, res) => {
  //console.log('here all employees list')

  oracledb.getConnection(connectionProperties).then((dbConn) => {
    dbConn.execute(
      "SELECT * FROM teacher WHERE ID = :ID",
      [req.params.id],
      (err, data, fields) => {
        try {
          if (!data.rows[0]) {
            console.log("Not found");
            throw {
              message: `CAN'T GET DATA WITH ID=${req.params.id}. MAYBE DATA WAS NOT FOUND!`,
            };
          }
        } catch (err) {
          res.status(404).send({
            MESSAGE: `Query Data Alert`,
            ERROR_DES: err,
          });
        }
        res.send({ message: "GET DATA SUCCESS!", data: data.rows });
        // res.send(rows);
      }
    );
  });
};
exports.CreateTeacher = (req, res) => {
  const { name, address } = req.body;

  // --------------------------

  oracledb.getConnection(connectionProperties).then((dbConn) => {
    dbConn.execute(
      "INSERT INTO teacher(name,address) VALUES(:name,:address)",
      [name, address],
      // AutoCommit(),
      (err, rows, fields) => {
        if (!err) {
          console.log("first", name, address);
          res.send({ message: "Get dat successfully!", data: req.body });
          console.log("Create success");
          // res.send(rows);
        } else
          res.status(404).send({
            message: "Error while inserting a user into the database",
            Error: err,
          });
      }
    );
  });
};
exports.DeleteTeacher = (req, res) => {
  try {
    oracledb.getConnection(connectionProperties).then((dbConn) => {
      console.log("Id", req.params.id);
      dbConn.execute(
        `DELETE FROM teacher WHERE ID =:id`,
        [req.params.id],
        AutoCommit(),
        (err, rows, fields) => {
          if (!err) {
            res.send({ message: `Delete id=${req.params.id} successfully!` });
            // res.send(rows);
          } else
            res.status(404).send({
              message: `Cannot delete Teacher with id=${req.params.id}. Maybe Teacher was not found!`,
              Error: err,
            });
        }
      );
    });
  } catch (error) {
    console.log("ERROR", error);

    res.send({ message: `${error}` });
  }
};
exports.UpdateTeacher = (req, res) => {
  const { name, address } = req.body;
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
    oracledb.getConnection(connectionProperties).then((dbConn) => {
      dbConn.execute(
        `UPDATE teacher SET name=:name,address=:address WHERE id =:id`,
        [name, address, req.params.id],
        AutoCommit(),
        (err, rows, fields) => {
          if (!err) {
            res.send({ message: `Update id=${req.params.id} successfully!` });
            // res.send(rows);
          } else
            res.status(404).send({
              message: `Cannot Update Teacher with id=${req.params.id}. Maybe Teacher was not found!`,
              Error: err,
            });
        }
      );
    });
  } catch (error) {
    console.log("ERROR", error);

    res.send({ message: `${error}` });
  }
};
