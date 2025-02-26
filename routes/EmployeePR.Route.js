const express = require("express");
const router = express.Router();
const EmployeeController = require("../Query/Employee.procedure");
//Get ClassExam(s)

router.post("/", EmployeeController.GETREPORT);

module.exports = router;
