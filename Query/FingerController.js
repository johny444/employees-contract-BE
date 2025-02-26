const oracledb = require("oracledb");
const DB = require("../config/CheckDB");

exports.GetFingerData = async (req, res) => {
  let connection;
  try {
    // เชื่อมต่อกับฐานข้อมูล
    connection = await oracledb.getConnection(DB.DBProperties());

    // สร้าง filters และ binds สำหรับ query
    const filters = [];
    const binds = {
      branch: req.query.branch || 'LVB050', // กำหนดค่า default
      departmentid: req.query.departmentid || null,
      startDate: req.query.startDate || '2025-01-01', // กำหนดค่า default
      endDate: req.query.endDate || '2025-01-31', // กำหนดค่า default
    };

    // สร้าง filter ตามพารามิเตอร์ที่มีอยู่
    if (req.query.branch) {
      filters.push("t.BRANCH = :branch");
    }
    if (req.query.departmentid) {
      filters.push("t.departmentid = :departmentid");
    }
    if (req.query.startDate && req.query.endDate) {
      filters.push("t.datevalue BETWEEN TO_DATE(:startDate, 'YYYY-MM-DD') AND TO_DATE(:endDate, 'YYYY-MM-DD')");
    }

    // สร้าง whereClause จาก filters
    const whereClause = filters.length > 0 ? `WHERE ${filters.join(" AND ")}` : "";

    // สร้าง SQL Query
    const sql = `
       SELECT USERNAME, FULLNAME, t.branch, DEPARTMENTNAME, DATEVALUE, 
         CLOCKIN, CLOCKOUT, f.status_name || '/' || f.status_english AS Status
  FROM LISTFINGER@Finger.lvb.la t
  LEFT JOIN FINGERSCAN_STATUS@Finger.lvb.la f ON t.status = f.st_id
  WHERE t.BRANCH = :branch
    AND t.departmentid = NVL(:departmentid, t.departmentid)
    AND t.datevalue BETWEEN TO_DATE(:startDate, 'YYYY-MM-DD') AND TO_DATE(:endDate, 'YYYY-MM-DD')
  ORDER BY t.departmentid, USERNAME, t.datevalue
    `;

    // 
    const result = await connection.execute(sql, binds, {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });

    // ส่งผลลัพธ์กลับไปยังผู้ใช้
    res.json({ message: "ดึงข้อมูลสำเร็จ", data: result.rows });
  } catch (error) {
    console.error("ข้อผิดพลาดของฐานข้อมูล:", error.message || error);
    res.status(500).json({ message: "ข้อผิดพลาดของฐานข้อมูล", error: error.message || "ไม่ทราบ" });
  } finally {
    if (connection) {
      try {
        await connection.close(); // ปิดการเชื่อมต่อ
      } catch (closeError) {
        console.error("เกิดข้อผิดพลาดขณะปิดการเชื่อมต่อ:", closeError);
      }
    }
  }
};
