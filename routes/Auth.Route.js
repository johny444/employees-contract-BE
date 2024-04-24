const { verifySignUp } = require("../middleware");
const Authcontroller = require("../controllers/auth.controller");
const express = require("express");
const router = express.Router();

router.post(
  "/api/auth/signup",
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  Authcontroller.signup
);

router.post("/auth/login", Authcontroller.login);

router.get("/auth/logout", Authcontroller.logout);
router.get("/Auth", Authcontroller.authenticateToken, (req, res) => {
  res.json({ message: "Protected data accessed", user: req.user });
});
module.exports = router;
