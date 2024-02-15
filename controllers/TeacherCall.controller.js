const query = require("../Query/Teacher");

exports.TeacherExcecute = (req, res) => {
  let { id, TeacherName, ACTION } = req.body;
  switch (ACTION) {
    case "GETAll":
      query.GetTeacherList(res);
      break;
    case "GETID":
      query.GetTeacherByID(id, res);
      break;
    case "DELETE":
      query.DelTeacher(id, res);
      break;
    case "INSERT":
      query.InsertTeacher(req, res);
      break;

    case "UPDATE":
      query.UpdateTeacher(req, res);
      break;

    default:
      res.send({
        message: `SERVER NOT EXIST THIS ACTION`,
      });
      break;
  }
};
