var dbConfig = require("../config/config");
const oracledb = require("oracledb");
const query = require("../config/Query");
oracledb.autoCommit = true;
var connectionProperties = {
  user: dbConfig.USER || "system",
  password: dbConfig.PASSWORD || "oracle",
  connectString: dbConfig.CONNECTSTRING || "localhost/orcl",
};
let users = [];
let obj = {};
exports.TeacherExcecute = (req, res) => {
  let { id, TeacherName, ACTION } = req.body;

  switch (ACTION) {
    case "GETAll":
      console.log("GETAll");
      oracledb.getConnection(connectionProperties).then((dbConn) => {
        dbConn.execute("SELECT * FROM teacher", (err, data, fields) => {
          try {
            if (!data.rows[0]) {
              console.log("Not EXIST");
              throw {
                message: `NOT EXIST ANY DATA!`,
              };
            }

            data.rows.map((v, i) => {
              obj = {
                id: data.rows[i][0],
                name: data.rows[i][1],
              };
              users.push(obj);
            });

            res.send({ message: "GET DATA SUCCESS!", data: users });
            users = [];
          } catch (err) {
            res.status(404).send({
              MESSAGE: `Query Data Alert`,
              ERROR_DES: err,
            });
          }
        });
      });
      break;

    case "GETID":
      oracledb.getConnection(connectionProperties).then((dbConn) => {
        dbConn.execute(
          "SELECT * FROM teacher WHERE ID = :ID",
          [id],
          (err, data, fields) => {
            try {
              // console.log("data.rows", data);
              if (!data.rows[0]) {
                console.log("data.rows[0]", data.rows[0]);
                console.log("Not EXIST");
                throw {
                  message: `CAN'T GET DATA WITH ID=${id}. MAYBE DATA WAS NOT EXIST!`,
                };
              }
              data.rows.forEach((v, i) => {
                obj = {
                  id: v[0],
                  name: v[1],
                };
              });
              res.send({ message: "GET DATA SUCCESS!", data: obj });
            } catch (err) {
              res.status(404).send({
                MESSAGE: `EXCECUTE DATA WARNING`,
                ERROR_DES: err,
              });
            }
          }
        );
      });

      break;
    case "DELETE":
      oracledb.getConnection(connectionProperties).then((dbConn) => {
        dbConn.execute(
          "DELETE FROM teacher WHERE ID =:id",
          [id],
          (err, data, fields) => {
            try {
              console.log("data.rows", data.lastRowid);
              if (!data.lastRowid) {
                console.log("Not EXIST");
                throw {
                  message: `CAN'T GET DATA WITH ID=${id}. MAYBE DATA WAS NOT EXIST!`,
                };
              }
              res.send({
                message: `DELETE DATA ID=${id} SUCCESS!`,
                data: data.rows,
              });
            } catch (err) {
              res.status(404).send({
                MESSAGE: `EXCECUTE DATA WARNING`,
                ERROR_DES: err,
              });
            }

            // res.send(rows);
          }
        );
      });
      ACTION = "GETAll";
      break;

    case "INSERT":
      try {
        console.log("TeacherName", TeacherName);
        if (!TeacherName) {
          console.log("Not EXIST");
          throw {
            message: `INSERT FAIL MAKE SURE U HAVE INPUT CORRECT DATA!`,
          };
        } else {
          oracledb.getConnection(connectionProperties).then((dbConn) => {
            dbConn.execute(
              "INSERT INTO teacher(NAME) VALUES(:NAME)",
              [TeacherName],
              (err, data, fields) => {
                if (!err) {
                  res.send({ message: "INSERT SUCCESS!", data: data.rows });
                  console.log("Create success");
                  // res.send(rows);
                } else {
                  res.status(404).send({
                    message: "Error while inserting a user into the database",
                    Error: err,
                  });
                }
              }
            );
          });
        }
      } catch (error) {
        console.log("error", error);
        res.status(404).send({
          MESSAGE: `INSERT ERROR`,
          ERROR_DES: error,
        });
      }
      ACTION = "GETAll";
      break;

    case "UPDATE":
      break;

    default:
      res.send({
        message: `SERVER NOT EXIST THIS ACTION`,
      });
      break;
  }
};
