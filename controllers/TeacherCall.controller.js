const query = require("../Query/Teacherc");

exports.TeacherExcecute = (req, res) => {
  let { id, name, ACTION } = req.body;
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
