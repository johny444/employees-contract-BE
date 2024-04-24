const oracledb = require("oracledb");
const DB = require("../config/CheckDB");
oracledb.autoCommit = true;
const callStmt = `BEGIN
CRUDSTUDENT( :PRID,
  :PRROLE,
:PRNAME,
  :PREMAIL,
  :PRGENDER,
  :PRPASSWORD,
   :PRSTUDENTCODE,
   :PRBIRTHDAY,
 :PREXAMID,
  :PRTIME,
 :PRACTION,
  :RS,
 :CURSOR,
 :ROWSAFFECTED);
END;`;

let users = [];
let obj = {};
const GetData = async (resultSet) => {
  while ((row = await resultSet.getRow())) {
    // console.log("row", row);
    obj = {
      id: row[0],
      role: row[1],
      name: row[2],
      email: row[3],
      gender: row[4],
      password: row[5],
      studentCode: row[6],
      birthday: row[7],
      ExamId: row[8],
      time: row[9],
    };
    users.push(obj);
  }
};
exports.CRUDSTUDENT = (req, res) => {
  let {
    id,
    role,
    name,
    email,
    gender,
    password,
    studentCode,
    birthday,
    ExamId,
    time,
    ACTION,
  } = req.body;
  // console.log("req.body:", req.body);
  const bindParams = {
    prID: id,
    prRole: role,
    prName: name,
    prEmail: email,
    prGender: gender,
    prPassword: password,
    prstudentCode: studentCode,
    prBirthday: birthday,
    prExamId: ExamId,
    prTime: time,
    prAction: ACTION,
    rs: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
    cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
    rowsAffected: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
  };
  oracledb.getConnection(DB.DBProperties()).then(async (dbConn) => {
    console.log("bindParams", bindParams);
    try {
      let result = await dbConn.execute(callStmt, bindParams);
      // console.log("result.outBinds.s:", result);
      const resultSet = result.outBinds.cursor;
      switch (ACTION) {
        case "GETAll":
          console.log("---------------------------------------------");
          console.log("GETAll");
          console.log("---------------------------------------------");
          if (!result.outBinds.rowsAffected) {
            res.send({
              MESSAGE: "NOT FOUND ANY DATA!",
            });
          } else {
            await GetData(resultSet);
            res.send({
              MESSAGE: result.outBinds.rs,
              AllRECORD: result.outBinds.rowsAffected,
              DATA: users,
            });
            users = [];
          }
          break;
        case "GETID":
          console.log("---------------------------------------------");
          console.log("GETID");
          console.log("---------------------------------------------");
          if (!result.outBinds.rowsAffected) {
            res.send({
              MESSAGE: result.outBinds.rs,
            });
          } else {
            await GetData(resultSet);
            res.send({ MESSAGE: result.outBinds.rs, DATA: users });
            users = [];
          }
          break;

        case "DELETE":
          console.log("---------------------------------------------");
          console.log("DELETE");
          console.log("---------------------------------------------");
          if (!result.outBinds.rowsAffected) {
            res.send({
              MESSAGE: "CAN'T GET DATA. MAYBE THIS DATA DID NOT EXIST!",
            });
          } else {
            await GetData(resultSet);
            res.send({
              MESSAGE: result.outBinds.rs,
              rowsAffected: result.outBinds.rowsAffected,
              DATA: users,
            });
            users = [];
          }
          break;
        case "INSERT":
          console.log("---------------------------------------------");
          console.log("INSERT");
          console.log("---------------------------------------------");
          await GetData(resultSet);
          res.send({
            MESSAGE: result.outBinds.rs,
            AllRECORD: result.outBinds.rowsAffected,
            DATA: users,
          });
          users = [];
          break;
        case "UPDATE":
          console.log("---------------------------------------------");
          console.log("UPDATE");
          console.log("---------------------------------------------");
          if (!result.outBinds.rowsAffected) {
            res.send({
              MESSAGE: "CAN'T GET DATA. MAYBE THIS DATA DID NOT EXIST!",
            });
          } else {
            await GetData(resultSet);
            res.send({
              MESSAGE: result.outBinds.rs,
              rowsAffected: result.outBinds.rowsAffected,
              DATA: users,
            });
            users = [];
          }
          break;
        default:
          res.send({
            MESSAGE: `SERVER NOT EXIST THIS ACTION`,
          });
          break;
      }
      DB.doRelease(dbConn);
    } catch (error) {
      console.log("ERROR CATCH:", error);
      res.status(404).send({
        MESSAGE: `Query Data Alert`,
        ERROR_DES: error,
      });
    }
  });
};
