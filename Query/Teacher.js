const oracledb = require("oracledb");
const DB = require("../config/CheckDB");
oracledb.autoCommit = true;
const callStmt = `BEGIN
CRUDTeacher(:prID, :prName, :prEmail, :prPassword, :prGender, :prBirthday, :prTime, :prRole, :prAction, :rs, :cursor,:rowsAffected);
END;`;

let users = [];
let obj = {};
const GetData = async (resultSet) => {
  while ((row = await resultSet.getRow())) {
    console.log("row", row);
    obj = {
      id: row[0],
      name: row[1],
      email: row[2],
      password: row[3],
      gender: row[4],
      birthday: row[5],
      role: row[6],
      time: row[7],
    };
    users.push(obj);
  }
};
exports.CRUDTEACHER = (req, res) => {
  let { id, name, email, password, gender, birthday, time, role, ACTION } =
    req.body;
  // console.log("req.body:", req.body);
  const bindParams = {
    prID: id,
    prName: name,
    prEmail: email,
    prPassword: password,
    prGender: gender,
    prBirthday: birthday,
    prTime: time,
    prRole: role,
    prAction: ACTION,
    rs: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
    cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
    rowsAffected: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
  };
  oracledb.getConnection(DB.DBProperties()).then(async (dbConn) => {
    // console.log("bindParams", bindParams);
    try {
      let result = await dbConn.execute(callStmt, bindParams);
      console.log("result.outBinds.s:", result);
      const resultSet = result.outBinds.cursor;
      switch (ACTION) {
        case "GETAll":
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
          await GetData(resultSet);
          res.send({
            MESSAGE: result.outBinds.rs,
            AllRECORD: result.outBinds.rowsAffected,
            DATA: users,
          });
          users = [];
          break;
        case "UPDATE":
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
