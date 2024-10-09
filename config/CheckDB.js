const oracledb = require("oracledb");
var dbConfig = require("../config/config");
var dbConn;

exports.checkconnect = async () => {
  // console.log("test:", process.env.TEST);
  try {
    dbConn = oracledb.getConnection(
      {
        user: "system",
        password: "1234",
        connectString: "localhost/jorcl",
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
    user: dbConfig.USER || "system",
    password: dbConfig.PASSWORD || "oracle",
    connectString: dbConfig.CONNECTSTRING || "localhost/orcl",
  };
  return connectionProperties;
};
