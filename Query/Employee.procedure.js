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
let records = [];
let obj = {};
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
    try {
      let result = await dbConn.execute(callStmt, bindParams, {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
      });

      const resultSet = result.outBinds.cursor;
      let rows = [];
      let row;
      // Fetch all rows from the cursor
      while ((row = await resultSet.getRow())) {
        rows.push(row); // Add each row to the rows array
      }

      // If no rows were fetched, send the "NOT FOUND ANY DATA!" message
      if (rows.length === 0) {
        res.send({
          MESSAGE: "NOT FOUND ANY DATA!",
        });
      } else {
        res.send({
          MESSAGE: result.outBinds.rs,
          LENGTH: rows.length,
          DATA: rows, // Send all rows
        });
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
