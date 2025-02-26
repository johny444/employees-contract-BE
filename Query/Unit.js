const oracledb = require("oracledb");
const DB = require("../config/CheckDB");

const GetUnits = async (req, res) => {
  const query = `SELECT * FROM hrlvb.unit`;
  let connection;

  try {
    connection = await oracledb.getConnection(DB.DBProperties());
    const result = await connection.execute(query);
    
    if (result.rows.length === 0) {
      return res.status(404).send({ MESSAGE: "No data found." });
    }
    
    const units = result.rows.map(row => ({
      unitId: row[0],
      unitCode: row[1],
      unitName: row[2],
      parentUnitCode: row[3],
      startDate: row[4],
      endDate: row[5],
      establishmentDecisionNo: row[6],
      signDateOpen: row[7],
      signedByOpen: row[8],
      taxCode: row[9],
      address: row[10],
      telephoneNo: row[11],
      function: row[12],
      closureDecisionNo: row[13],
      signDateClose: row[14],
      signedByClose: row[15],
      reasons: row[16],
      residentialArea: row[17],
      village: row[18],
      district: row[19],
      city: row[20],
      unitTypeCode: row[21],
      status: row[22],
      orderNumber: row[23],
      brnCodeFCC: row[24],
    }));
    
    res.send({ DATA: units });
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).send({ MESSAGE: "Error fetching data", ERROR: error });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err.message);
      }
    }
  }
};

module.exports = { GetUnits };
