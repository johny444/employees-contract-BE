const config = require("../config/auth.config");

const oracledb = require("oracledb");
const DB = require("../config/CheckDB");
oracledb.autoCommit = true;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  // Save User to Database
  // try {
  //   // const user = await User.create({
  //   //   username: req.body.username,
  //   //   email: req.body.email,
  //   //   password: bcrypt.hashSync(req.body.password, 8),
  //   // });
  //   if (req.body.roles) {
  //     const roles = await Role.findAll({
  //       where: {
  //         name: {
  //           [Op.or]: req.body.roles,
  //         },
  //       },
  //     });
  //     const result = user.setRoles(roles);
  //     if (result) res.send({ message: "User registered successfully!" });
  //   } else {
  //     // user has role = 1
  //     const result = user.setRoles([1]);
  //     if (result) res.send({ message: "User registered successfully!" });
  //   }
  // } catch (error) {
  //   res.status(500).send({ message: error.message });
  // }
};
let users = [];
let obj = {};
exports.login = async (req, res, next) => {
  // console.log("req:", req.body);
  const { email, password } = req.body;
  let dbConn;
  try {
    dbConn = await oracledb.getConnection(DB.DBProperties());
    console.log("Connected to Oracle database!");
    const result = await dbConn.execute(
      "SELECT email,id,name,gender,birthday, role FROM teacher UNION ALL SELECT email,id,name,gender,birthday, role FROM student"
    );
    // Check if there is an error in the result
    if (result.rows.length === 0) {
      console.log("USER ACCOUNT INVALID");
      return res.status(200).send({ message: "USER ACCOUNT INVALID" });
    }

    // Find the user by email
    const user = result.rows.find(([userEmail]) => userEmail === email);
    // console.log("data", result.rows);
    console.log("result", user);

    if (user) {
      obj = {
        id: user[1],
        email: user[0],
        name: user[2],
        gender: user[3],
        birthday: user[4],
        role: user[5],
      };
      users.push(obj);

      const token = jwt.sign({ user: users }, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });
      res.status(200).send({
        message: "LOGIN SUCCESS",
        token: token,
        role: users[0].role,
      });
      console.log("users.role", users[0].role);
      console.log("LOGIN SUCCESS");
      users = [];
    } else {
      console.log("USER ACCOUNT INVALID");
      res.status(401).send({ message: "INVALID CREDENTIALS" });
    }
  } catch (error) {
    console.log("error catch:", error);
    return res.status(500).send({ message: error.message });
  } finally {
    // Change: Release the connection in the finally block to ensure it gets released
    if (dbConn) {
      try {
        await DB.doRelease(dbConn);
      } catch (releaseError) {
        console.error("Error releasing connection:", releaseError);
      }
    }
  }
};

exports.authenticateToken = (req, res, next) => {
  try {
    console.log("------------------Login 2------------------------");
    // const authToken = req.cookies.token;
    const authHeader = req.headers["authorization"];
    const authToken = authHeader && authHeader.split(" ")[1];
    console.log("authToken", authToken);
    if (!authToken) {
      return res.sendStatus(403);
    }

    // res.send({ token: authToken });
    //check Token correct
    const checktoken = jwt.verify(authToken, config.secret);
    console.log("checktoken:", checktoken);
    // res.send({ message: checktoken.user });
    req.user = checktoken.user;
    next();
  } catch (error) {
    console.log("error catch:", error);
    return res.status(500).send({ message: error });
  }
};
exports.logout = async (req, res) => {
  try {
    return res
      .clearCookie("token")
      .status(200)
      .json({ message: "Successfully logged out 😏 🍀" });
  } catch (error) {
    res.send({ message: error });
  }
};
