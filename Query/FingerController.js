const oracledb = require("oracledb");
const DB = require("../config/CheckDB");

exports.GetFingerData = async (req, res) => {
  let connection;
  try {
    // Connect to the database
    connection = await oracledb.getConnection(DB.DBProperties());

    // Create filters and binds for the query
    const filters = [];
    const binds = {
      branch: req.query.branch || 'LVB050', // Set default value
      departmentid: req.query.departmentid || null,
      startDate: req.query.startDate || '2025-01-01', // Set default value
      endDate: req.query.endDate || '2025-01-31', // Set default value
    };

    // Create filters based on the available parameters
    if (req.query.branch) {
      filters.push("t.BRANCH = :branch");
    }
    if (req.query.departmentid) {
      filters.push("t.departmentid = :departmentid");
    }
    if (req.query.startDate && req.query.endDate) {
      filters.push("t.datevalue BETWEEN TO_DATE(:startDate, 'YYYY-MM-DD') AND TO_DATE(:endDate, 'YYYY-MM-DD')");
    }

    // Create whereClause from filters
    const whereClause = filters.length > 0 ? `WHERE ${filters.join(" AND ")}` : "";

    // Construct the SQL query
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

    // Execute the query
    const result = await connection.execute(sql, binds, {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });

    // Send the result back to the user
    res.json({ message: "Data retrieved successfully", data: result.rows });
  } catch (error) {
    console.error("Database error:", error.message || error);
    res.status(500).json({ message: "Database error", error: error.message || "Unknown" });
  } finally {
    if (connection) {
      try {
        await connection.close(); // Close the connection
      } catch (closeError) {
        console.error("Error while closing the connection:", closeError);
      }
    }
  }
};
