const mysql = require("mysql");

// create here mysql connection

// const dbConn = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "node_mysql_crud_db",
// });

var dbConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: `exam-project`,
  multipleStatements: true,
});
dbConn.connect((err) => {
  if (!err) console.log("DB connection succeded.");
  else
    console.log(
      "DB connection failed \n Error : " + JSON.stringify(err, undefined, 2)
    );
});
module.exports = dbConn;
