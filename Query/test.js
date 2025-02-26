const oracledb = require("oracledb");
const DB = require("../config/CheckDB");
oracledb.autoCommit = true;

const callStmt = `BEGIN
EMPLOYEE_REPORT(
  :PR_START,
  :PR_END,
  :PR_PTYPE,
  :PR_DEP_CODE,
  :PR_BRN_CODE,
  :PR_LEAVEYEAR,
  :PRACTION,
  :rs,
  :cursor,
  :rowsAffected);
END;`;

exports.GETREPORT = (req, res) => {
  let { start, end, positionType, dep_code, brn_code, leaveyear, ACTION } =
    req.body;

  const bindParams = {
    PR_START: start,
    PR_END: end,
    PR_PTYPE: positionType,
    PR_DEP_CODE: dep_code,
    PR_BRN_CODE: brn_code,
    PR_LEAVEYEAR: leaveyear,
    PRACTION: ACTION,
    rs: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
    cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
    rowsAffected: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
  };

  oracledb.getConnection(DB.DBProperties()).then(async (dbConn) => {
    // console.log("bindParams:", bindParams); // Debug input values

    try {
      let result = await dbConn.execute(callStmt, bindParams);
      console.log("Procedure output:", result.outBinds);

      const resultSet = result.outBinds.cursor;
      console.log("cursor:", resultSet);
      let records = [];

      if (resultSet) {
        let records = await resultSet.getRows();
        await resultSet.close();
      } else {
        res.send({ MESSAGE: "No cursor returned" });
      }

      if (records.length === 0) {
        res.send({ MESSAGE: "NOT FOUND ANY DATA!" });
      } else {
        res.send({
          MESSAGE: result.outBinds.rs,
          DATA: records,
        });
      }

      DB.doRelease(dbConn);
    } catch (error) {
      console.log("ERROR CATCH:", error);
      res.status(404).send({
        MESSAGE: "QUERY EXCEPTION",
        ERROR_DES: error,
      });
    }
  });
};
