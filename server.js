const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const examRoute = require("./routes/Exam");
const subjectRoute = require("./routes/Subject");
const questionRoute = require("./routes/question");
const studentRoute = require("./routes/student");
const resultRoute = require("./routes/result");
const teacherRoute = require("./routes/teacher");

require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello!!Welcome to bezkoder application." });
});
app.use("/subject", subjectRoute);
app.use("/exam", examRoute);
app.use("/question", questionRoute);
app.use("/student", studentRoute);
app.use("/result", resultRoute);
app.use("/teacher", teacherRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on:${PORT}`);
});
