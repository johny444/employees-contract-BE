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
const leader = `select EMPID, EMPNAME, POSITIONTYPENAME, FROMDATE, TODATE, DEPARTMENT, BRANCH from (
select a.empid,a.EMPNAME,a.POSITIONTYPENAME, a.FROMDATE, a.TODATE,  a.UNITNAME Department, un.unitname Branch, a.dep_code, a.positiontypecode from (
select w.empid,w.dep_code,e.empname,e.birthday,w.fromdate,w.todate,p.positiontypename,u.unitname,w.brn_code,p.positiontypecode from HRLVB.employees_view e 
join HRLVB.workingexperience_authorized w on e.empid=w.empid
join HRLVB.unit u on w.dep_code=u.unitcode
join HRLVB.positiontype p on w.positiontypecode=p.positiontypecode
where (w.leavetype!=4 or w.leavetype is null) 
and p.positiontypename not in (N'ພະ​ນັກ​ງານ ອະ​ນາ​ໄມ',N'​ພະ​ນັກ​ງານ ຂັບ​ລົດ, ພະ​ນັກ​ງານ​ບໍ​ລິ​ຫານ​ທົ່ວ​ໄປ',N'ວິ​ຊາ​ການ/Officer',N'ວິ​ຊາ​ການ (ເຊັນ​ກວດ​ສອບ)',N'ພະນັກງານທົດລອງວຽກ',N'ພະນັກງານສັນຍາຈ້າງ')
order by e.empid,w.fromdate) a
join HRLVB.unit un on a.brn_code=un.unitcode) a
where a.todate is null
order by dep_code,empid,FROMDATE desc
`;
const all = `select EMPID, EMPNAME, POSITIONTYPENAME, FROMDATE, TODATE, DEPARTMENT, BRANCH from (
select a.empid,a.EMPNAME,a.POSITIONTYPENAME, a.FROMDATE, a.TODATE,  a.UNITNAME Department, un.unitname Branch, a.dep_code, a.positiontypecode from (
select w.empid,w.dep_code,e.empname,e.birthday,w.fromdate,w.todate,p.positiontypename,u.unitname,w.brn_code,p.positiontypecode from HRLVB.employees_view e 
join HRLVB.workingexperience_authorized w on e.empid=w.empid
join HRLVB.unit u on w.dep_code=u.unitcode
join HRLVB.positiontype p on w.positiontypecode=p.positiontypecode
where (w.leavetype!=4 or w.leavetype is null) 
order by e.empid,w.fromdate) a
join HRLVB.unit un on a.brn_code=un.unitcode) a
where a.todate is null
order by dep_code,empid,FROMDATE desc
`;
exports.GETEMPLOYEES_POSITION = (req, res) => {
  console.log("GETEMPLOYEES_POSITION");
  console.log("req:", req.body);

  oracledb.getConnection(DB.DBProperties()).then(async (dbConn) => {
    try {
      var result = null;
      switch (req.body.type) {
        case "leader":
          result = await dbConn.execute(
            leader,
            {},
            {
              outFormat: oracledb.OUT_FORMAT_OBJECT,
            }
          );
          break;
        case "all":
          result = await dbConn.execute(
            all,
            {},
            {
              outFormat: oracledb.OUT_FORMAT_OBJECT,
            }
          );
          break;

        default:
          break;
      }

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
