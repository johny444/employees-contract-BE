const oracledb = require("oracledb");
const DB = require("../config/CheckDB");
oracledb.autoCommit = true;

let users = [];
let obj = {};
exports.GetExamList = (res) => {
  oracledb.getConnection(DB.DBProperties()).then((dbConn) => {
    dbConn.execute("SELECT * FROM Exam", (err, data, fields) => {
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
            role: data.rows[i][1],
            name: data.rows[i][2],
            email: data.rows[i][3],
            gender: data.rows[i][4],
            password: data.rows[i][5],
            Examcode: data.rows[i][6],
            birthday: data.rows[i][7],
            examid: data.rows[i][8],
            time: data.rows[i][9],
            token: data.rows[i][10],
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
exports.GetExamByID = (id, res) => {
  oracledb.getConnection(DB.DBProperties()).then((dbConn) => {
    dbConn.execute(
      "SELECT * FROM Exam WHERE ID = :ID",
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
              role: v[1],
              name: v[2],
              email: v[3],
              gender: v[4],
              password: v[5],
              Examcode: v[6],
              birthday: v[7],
              examid: v[8],
              time: v[9],
              token: v[10],
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
exports.DelExam = (id, res) => {
  let arr = id.split(",");
  console.log("arr", arr);
  oracledb.getConnection(DB.DBProperties()).then((dbConn) => {
    if (arr.length <= 1) {
      console.log("<=1");
      dbConn.execute(
        "DELETE FROM Exam WHERE ID =:id",
        [id],
        (err, data, fields) => {
          try {
            console.log("data", data);
            // console.log("err", err);
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
            // console.log("err catch", err);
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
        "DELETE FROM Exam WHERE ID IN (" +
          arr.map((id, index) => "'" + id + "'").join(",") +
          ")",
        (err, data, fields) => {
          try {
            // console.log("data", data);
            // console.log("err", err);
            if (err) {
              throw err;
            } else if (!data.lastRowid) {
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
            console.log("error:", err);
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
exports.InsertExam = (req, res) => {
  // let { id, name, email, password, gender, birthday, time, role, token } =
  //   req.body;
  let { id, name, email, password, gender, birthday, time, role, token } =
    req.body;
  console.log("object", req.body);
  try {
    if (!name) {
      console.log("Not EXIST");
      throw {
        message: `INSERT FAIL MAKE SURE U HAVE INPUT CORRECT DATA!`,
      };
    } else {
      oracledb.getConnection(DB.DBProperties()).then((dbConn) => {
        dbConn.execute(
          "INSERT INTO Exam(name,email,password,gender) VALUES(:name,:email,:password,:gender)",
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
              console.log("err", err);
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
exports.UpdateExam = (req, res) => {
  let { id, name, email, password, gender, birthday, time, role, token } =
    req.body;
  oracledb.getConnection(DB.DBProperties()).then((dbConn) => {
    dbConn.execute(
      "UPDATE Exam SET name=:name,email=:email,password=:password,gender=:gender WHERE id =:id",
      [name, email, password, gender, id],
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
