const query = require("../Query/Exam");

exports.ExamExcecute = (req, res) => {
  let { id, name, ACTION } = req.body;
  switch (ACTION) {
    case "GETAll":
      query.GetExamList(res);
      break;
    case "GETID":
      query.GetExamByID(id, res);
      break;
    case "DELETE":
      query.DelExam(id, res);
      break;
    case "INSERT":
      query.InsertExam(req, res);
      break;

    case "UPDATE":
      query.UpdateExam(req, res);
      break;

    default:
      res.send({
        message: `SERVER NOT EXIST THIS ACTION`,
      });
      break;
  }
};
