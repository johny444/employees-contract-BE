// const db = require("../models");
const config = require("../config/auth.config");
// const User = db.user;
// const Role = db.role;

// const Op = db.Sequelize.Op;
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
  console.log("req:", req.body);
  const { email, password } = req.body;
  oracledb.getConnection(DB.DBProperties()).then((dbConn) => {
    dbConn.execute(
      "SELECT email,id,name,gender,birthday, role FROM teacher UNION ALL SELECT email,id,name,gender,birthday, role FROM student",
      (err, data, fields) => {
        try {
          const user = data;
          const result = data.rows.find(([email]) => email === req.body.email);
          console.log("result", result);
          if (result) {
            obj = {
              id: result[1],
              email: result[0],
              name: result[2],
              gender: result[3],
              birthday: result[4],
              role: result[5],
            };
            users.push(obj);
            const token = jwt.sign({ user: users }, config.secret, {
              algorithm: "HS256",
              allowInsecureKeySizes: true,
              expiresIn: 86400, // 24 hours
            });
            res.status(200).send({
              message: "ACCOUNT VALID",
              token: token,
              role: users[0].role,
            });
            console.log("users.role", users[0].role);
            // next();
            console.log("ACCOUNT VALID");
            users = [];
          } else {
            console.log("USER ACCOUNT INVALID");
            res.status(200).send({ message: "USER ACCOUNT INVALID" });
            // res.status(200).send({ message: "Object not found" });
          }
          // if (!user) {
          //   return res.status(404).send({ message: "User Not found." });
          // }

          // const passwordIsValid = bcrypt.compareSync(
          //   req.body.password,
          //   user.password
          // );

          // if (!passwordIsValid) {
          //   return res.status(401).send({
          //     message: "Invalid Password!",
          //   });
          // }

          // let authorities = [];
          // const roles = await user.getRoles();
          // for (let i = 0; i < roles.length; i++) {
          //   authorities.push("ROLE_" + roles[i].name.toUpperCase());
          // }

          // req.session.token = token;
          // return res.status(200).send({
          //   id: user.id,
          //   username: user.username,
          //   email: user.email,
          //   roles: authorities,
          // });
        } catch (error) {
          console.log("error catch:", error);
          return res.status(500).send({ message: error.message });
        }
      }
    );
    DB.doRelease(dbConn);
  });
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
    return res.status(500).send({ message: error.message });
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
