const express = require("express");
const router = express.Router();
const UnitsController = require("../Query/Unit");

router.get("/units", UnitsController.GetUnits);

module.exports = router;

