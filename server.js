const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const examRoute = require("./routes/Exam");
const subjectRoute = require("./routes/Subject");
const questionRoute = require("./routes/question");
const studentRoute = require("./routes/Student");
const resultRoute = require("./routes/result");
const teacherRoute = require("./routes/teacher");
const teacherCallRoute = require("./routes/TeacherCall");
const DBconnect = require("./config/CheckDB");
var logger = require("morgan");
require("dotenv").config();
app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.json());
DBconnect.checkconnect(); //Connect database check
app.get("/", (req, res) => {
  res.json({ message: "Hello!!Welcome to bezkoder application." });
});
app.use("/subject", subjectRoute);
app.use("/exam", examRoute);
app.use("/question", questionRoute);
app.use("/student", studentRoute);
app.use("/result", resultRoute);
app.use("/teacher", teacherRoute);
app.use("/teacherCall", teacherCallRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on:${PORT}`);
});
