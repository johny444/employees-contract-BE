const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const classExamRoute = require("./routes/ClassExam.Route");
const EmployeeRoute = require("./routes/Employee.Route");
const AuthRoute = require("./routes/Auth.Route");
const DBconnect = require("./config/CheckDB");
var logger = require("morgan");
require("dotenv").config();
app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
DBconnect.checkconnect(); //Connect database check
app.get("/", (req, res) => {
  res.json({ message: "Hello!!Welcome to bezkoder application." });
});
app.use("/employees", EmployeeRoute);

app.use("/", AuthRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on:${PORT}`);
});
