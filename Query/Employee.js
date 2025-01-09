const oracledb = require("oracledb");
const DB = require("../config/CheckDB");
oracledb.autoCommit = true;
const callStmt = `select t.empname,c.contractno,c.duration,c.startdate,c.enddate,t.position,t.Dep from HRLVB.EMPLOYEES_VIEW t 
left join HRLVB.contract_authorized c on t.empid=c.empid
where c.active=1
and  c.duration <> N'ບໍ່ມີກໍານົດ' and (c.enddate between :1 and :2 or c.enddate is null )
order by t.dep_code, c.duration

`;

let records = [];
let obj = {};

exports.GETEMPLOYEES = (req, res) => {
  let { id, subjectExam, status, classExam, time, teacherID, ACTION } =
    req.body;
  console.log("req:", req.body);
  let start = "01-JAN-2025";
  let end = "01-june-2025";

  oracledb.getConnection(DB.DBProperties()).then(async (dbConn) => {
    // console.log("bindParams", bindParams);
    try {
      let result = await dbConn.execute(
        callStmt,
        [req.body.start, req.body.end],
        {
          outFormat: oracledb.OUT_FORMAT_OBJECT,
        }
      );
      console.log("length:", result.rows.length);
      // console.log("result:", result.rows);
      res.send({
        MESSAGE: "Get data success",
        AllRECORD: result.rows ? result.rows.length : 0,
        DATA: result.rows,
      });

      records = [];

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
