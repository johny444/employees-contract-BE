const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const EmployeeRoute = require("./routes/Employee.Route");
const PositionRoute = require("./routes/EmployeePosition.Route");
const DayoffHist = require("./routes/EmployeeDayofHist.Route");
const BranchUnit = require("./routes/EmployeeBranchUnit.Route");
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
app.use("/employees-position", PositionRoute);
app.use("/employees-DayoffHist", DayoffHist);
app.use("/employees-BranchUnit", BranchUnit);

app.use("/", AuthRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on:${PORT}`);
});
