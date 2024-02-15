const oracledb = require("oracledb");
var dbConn;

exports.checkconnect = async () => {
  try {
    dbConn = oracledb.getConnection(
      {
        user: "system",
        password: "1234",
        connectString: "localhost/orcl",
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
    dbConn.release(function (err) {
      if (err) {
        console.error(err.message);
      }
    });
  } catch (error) {
    console.log("error");
  }
};
exports.doRelease = (connection) => {
  connection.release(function (err) {
    if (err) {
      console.error(err.message);
    }
  });
};
