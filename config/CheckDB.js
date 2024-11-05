const oracledb = require("oracledb");
var dbConfig = require("../config/config");
var dbConn;

exports.checkconnect = async () => {
  try {
    dbConn = oracledb.getConnection(
      {
        user: process.env.USER,
        password: process.env.PASSWORD,
        connectString: process.env.CONNECTSTRING,
      },
      function (err, dbConn) {
        if (err) {
          console.error("err", err);
          return;
        }

        console.log("Connected to Oracle database success!");
        console.log("-----------------------------");
      }
    );
    // dbConn.release(function (err) {
    //   if (err) {
    //     console.error(err.message);
    //   }
    // });
  } catch (error) {
    console.log("error:", error);
  }
};
exports.doRelease = (connection) => {
  connection.release(function (err) {
    if (err) {
      console.error(err.message);
    }
  });
};
exports.DBProperties = () => {
  let connectionProperties = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    connectString: process.env.CONNECTSTRING,
  };
  return connectionProperties;
};
