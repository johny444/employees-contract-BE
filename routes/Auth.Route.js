const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const express = require("express");
const router = express.Router();

router.post(
  "/api/auth/signup",
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  controller.signup
);

router.post("/auth/login", controller.login);

router.get("/auth/logout", controller.logout);
router.get("/auth/getlogin", controller.getdataToken);
module.exports = router;
