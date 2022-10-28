const express = require("express");
const router = express.Router();
const resultController = require("../controllers/Result.controller");
//Get Result(s)
router.get("/", resultController.getResultList);
router.get("/:id", resultController.getResultbyID);
router.post("/", resultController.CreateResult);
router.put("/:id", resultController.UpdateResult);
router.delete("/:id", resultController.DeleteResult);

module.exports = router;
