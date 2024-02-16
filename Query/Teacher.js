const oracledb = require("oracledb");
const DB = require("../config/CheckDB");
oracledb.autoCommit = true;

let users = [];
let obj = {};
exports.GetTeacherList = (res) => {
  oracledb.getConnection(DB.DBProperties()).then((dbConn) => {
    dbConn.execute("SELECT * FROM teacher", (err, data, fields) => {
      try {
        if (!data.rows[0]) {
          console.log("Not EXIST");
          throw {
            message: `NOT HAVE ANY DATA!`,
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
    DB.doRelease(dbConn);
  });
};
exports.GetTeacherByID = (id, res) => {
  oracledb.getConnection(DB.DBProperties()).then((dbConn) => {
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
              message: `CAN'T GET DATA WITH ID=${id}. MAYBE DATA DID NOT EXIST!`,
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
    DB.doRelease(dbConn);
  });
};
exports.DelTeacher = (id, res) => {
  console.log("id", id);
  let arr = id.split(",");
  console.log("arr", arr.length);
  oracledb.getConnection(DB.DBProperties()).then((dbConn) => {
    if (arr.length <= 1) {
      console.log("<=1");
      dbConn.execute(
        "DELETE FROM teacher WHERE ID =:id",
        [id],
        (err, data, fields) => {
          try {
            if (!data.lastRowid) {
              console.log("Not EXIST");
              throw {
                message: `CAN'T GET DATA WITH ID=${id}. MAYBE DATA DID NOT EXIST!`,
              };
            }
            res.send({
              message: `DELETE DATA ID=${id} SUCCESS!`,
              rowsAffected: data.rowsAffected + " ROWS DELETE",
            });
          } catch (err) {
            res.status(404).send({
              MESSAGE: `EXCECUTE DATA WARNING`,
              ERROR_DES: err,
            });
          }
        }
      );
    } else {
      console.log(">1");
      dbConn.execute(
        `DELETE FROM TEACHER WHERE ID IN(${id})`,
        (err, data, fields) => {
          try {
            if (!data.lastRowid) {
              console.log("Not EXIST");
              throw {
                message: `CAN'T GET DATA WITH ID=${id}. MAYBE DATA DID NOT EXIST!`,
              };
            }
            res.send({
              message: `DELETE DATA ID=${id} SUCCESS!`,
              rowsAffected: data.rowsAffected + " ROWS DELETE",
            });
          } catch (err) {
            res.status(404).send({
              MESSAGE: `EXCECUTE DATA WARNING`,
              ERROR_DES: err,
            });
          }
        }
      );
    }
    DB.doRelease(dbConn);
  });
};
exports.InsertTeacher = (req, res) => {
  let { id, TeacherName } = req.body;
  try {
    if (!TeacherName) {
      console.log("Not EXIST");
      throw {
        message: `INSERT FAIL MAKE SURE U HAVE INPUT CORRECT DATA!`,
      };
    } else {
      oracledb.getConnection(DB.DBProperties()).then((dbConn) => {
        dbConn.execute(
          "INSERT INTO teacher(NAME) VALUES(:NAME)",
          [TeacherName],
          (err, data, fields) => {
            console.log("data", data);
            if (!err) {
              res.send({
                message: "INSERT SUCCESS!",
                rowsAffected: data.rowsAffected,
              });
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
        DB.doRelease(dbConn);
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(404).send({
      MESSAGE: `INSERT ERROR`,
      ERROR_DES: error,
    });
  }
};
exports.UpdateTeacher = (req, res) => {
  let { id, TeacherName, ACTION } = req.body;
  oracledb.getConnection(DB.DBProperties()).then((dbConn) => {
    dbConn.execute(
      "UPDATE teacher SET name=:name WHERE id =:id",
      [TeacherName, id],
      (err, data, fields) => {
        try {
          console.log("data.rows", data);
          if (!data.lastRowid) {
            console.log("Not EXIST");
            throw {
              message: `CAN'T FIND DATA WITH ID=${id}. MAYBE DATA DID NOT EXIST!`,
            };
          }
          res.send({
            message: `UPDATE DATA ID=${id} SUCCESS!`,
            rowsAffected: data.rowsAffected,
          });
        } catch (err) {
          res.status(404).send({
            MESSAGE: `EXCECUTE DATA WARNING`,
            ERROR_DES: err,
          });
        }
      }
    );
    DB.doRelease(dbConn);
  });
};
