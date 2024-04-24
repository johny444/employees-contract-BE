const oracledb = require("oracledb");
const DB = require("../config/CheckDB");
oracledb.autoCommit = true;
const callStmt = `BEGIN
CRUDQUESTION(
  :PRID,
  :PRQUESTION,
  :PROPTIONS,
  :PRANSWER,
  :PREXAMID,
  :PRTIME,
   :prAction,
   :rs,
   :cursor,
   :rowsAffected);
END;`;
let records = [];
let obj = {};
const GetData = async (resultSet) => {
  while ((row = await resultSet.getRow())) {
    obj = {
      id: row[0],
      question: row[1],
      options: row[2],
      answer: row[3],
      examID: row[4],
      time: row[5],
    };
    records.push(obj);
  }
};
exports.CRUDQUESTION = (req, res) => {
  let { id, question, options, answer, examID, time, ACTION } = req.body;
  const bindParams = {
    prID: id,
    PRQUESTION: question,
    PROPTIONS: options,
    PRANSWER: answer,
    PREXAMID: examID,
    PRTIME: time,
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
              DATA: records,
            });
            records = [];
          }
          break;
        case "GETID":
          if (!result.outBinds.rowsAffected) {
            res.send({
              MESSAGE: result.outBinds.rs,
            });
          } else {
            await GetData(resultSet);
            res.send({ MESSAGE: result.outBinds.rs, DATA: records });
            records = [];
          }
          break;
        case "GETBYEXAMID":
          if (!result.outBinds.rowsAffected) {
            res.send({
              MESSAGE: result.outBinds.rs,
            });
          } else {
            await GetData(resultSet);
            res.send({ MESSAGE: result.outBinds.rs, DATA: records });
            records = [];
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
              DATA: records,
            });
            records = [];
          }
          break;
        case "INSERT":
          await GetData(resultSet);
          res.send({
            MESSAGE: result.outBinds.rs,
            AllRECORD: result.outBinds.rowsAffected,
            DATA: records,
          });
          records = [];
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
              DATA: records,
            });
            records = [];
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
