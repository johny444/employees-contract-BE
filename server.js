const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const examRoute = require("./routes/Exam.Route");
const classExamRoute = require("./routes/ClassExam.Route");
const questionRoute = require("./routes/Question.Route");
const studentRoute = require("./routes/Student.Route");
const resultRoute = require("./routes/Result.Route");
const teacherRoute = require("./routes/Teacher.Route");
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
app.use("/classExam", classExamRoute);
app.use("/exam", examRoute);
app.use("/question", questionRoute);
app.use("/student", studentRoute);
app.use("/result", resultRoute);
app.use("/teacher", teacherRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on:${PORT}`);
});
