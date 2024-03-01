const express = require("express");
const router = express.Router();
const studentController = require("../Query/Teacher");

router.post("/", studentController.CRUDTEACHER);

module.exports = router;
