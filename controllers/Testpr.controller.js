const query = require("../Query/ClassExam");

exports.ClassExamExcecute = (req, res) => {
  let { id, name, ACTION } = req.body;
  switch (ACTION) {
    case "GETAll":
      query.GetClassExamList(res);
      break;
    case "GETID":
      query.GetClassExamByID(id, res);
      break;
    case "DELETE":
      query.DelClassExam(id, res);
      break;
    case "INSERT":
      query.InsertClassExam(req, res);
      break;

    case "UPDATE":
      query.UpdateClassExam(req, res);
      break;

    default:
      res.send({
        message: `SERVER NOT EXIST THIS ACTION`,
      });
      break;
  }
};
