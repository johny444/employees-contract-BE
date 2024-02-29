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
        console.log("data.rows", typeof data.rows);
        data.rows.map((v, i) => {
          obj = {
            id: data.rows[i][0],
            name: data.rows[i][1],
            email: data.rows[i][2],
            password: data.rows[i][3],
            gender: data.rows[i][4],
            birthday: data.rows[i][5],
            time: data.rows[i][6],
            role: data.rows[i][7],
            token: data.rows[i][8],
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
              email: v[2],
              password: v[3],
              gender: v[4],
              birthday: v[5],
              time: v[6],
              role: v[7],
              token: v[8],
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
  oracledb.getConnection(DB.DBProperties()).then((dbConn) => {
    if (arr.length <= 1) {
      console.log("1");
      dbConn.execute(
        "DELETE FROM teacher WHERE ID =:id",
        [id],
        (err, data, fields) => {
          try {
            console.log("data", data);
            console.log("err", err);
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
        "DELETE FROM TEACHER WHERE ID IN (" +
          arr.map((id, index) => "'" + id + "'").join(",") +
          ")",
        (err, data, fields) => {
          console.log("error", err);
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
  // let { id, name, email, password, gender, birthday, time, role, token } =
  //   req.body;
  let { id, name, email, password, gender, birthday, time, role, token } =
    req.body;
  console.log("object insert", req.body);
  try {
    if (!name) {
      console.log("Not EXIST");
      throw {
        message: `INSERT FAIL MAKE SURE U HAVE INPUT CORRECT DATA!`,
      };
    } else {
      oracledb.getConnection(DB.DBProperties()).then((dbConn) => {
        dbConn.execute(
          "INSERT INTO teacher(name,email,password,gender) VALUES(:name,:email,:password,:gender)",
          [name, email, password, gender],
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
  let { id, name, ACTION } = req.body;
  oracledb.getConnection(DB.DBProperties()).then((dbConn) => {
    dbConn.execute(
      "UPDATE teacher SET name=:name WHERE id =:id",
      [name, id],
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
