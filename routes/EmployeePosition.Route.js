const express = require("express");
const router = express.Router();
const EmployeeController = require("../Query/Employee");
//Get ClassExam(s)

router.post("/", EmployeeController.GETEMPLOYEES_POSITION);

module.exports = router;
