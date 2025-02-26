const express = require("express");
const router = express.Router();
const fingerController = require("../Query/FingerController");

router.get("/finger", fingerController.GetFingerData);

module.exports = router;
