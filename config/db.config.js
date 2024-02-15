const oracledb = require("oracledb");
var dbConn;

const checkconnect = async () => {
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
        // var sql =
        //   "CREATE TABLE customers (Id int,name VARCHAR(255), address VARCHAR(255))";

        // dbConn.execute(sql, function (err, result) {
        //   if (err) {
        //     console.error(err);
        //     return;
        //   }
        //   console.log(result.rows);
        // });
        // -----------------------
        // CREATE TABLE IF NOT EXISTS Companies (
        //   id int,
        //   name varchar(50),
        //   address text,
        //   email varchar(50),
        //   phone varchar(10)
        // );
      }
    );
  } catch (error) {
    console.log("error");
  }
};
module.exports = checkconnect;
