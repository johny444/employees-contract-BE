const query = require("../Query/Question");

exports.QuestionExcecute = (req, res) => {
  let { id, name, ACTION } = req.body;
  switch (ACTION) {
    case "GETAll":
      query.GetQuestionList(res);
      break;
    case "GETID":
      query.GetQuestionByID(id, res);
      break;
    case "DELETE":
      query.DelQuestion(id, res);
      break;
    case "INSERT":
      query.InsertQuestion(req, res);
      break;

    case "UPDATE":
      query.UpdateQuestion(req, res);
      break;

    default:
      res.send({
        message: `SERVER NOT EXIST THIS ACTION`,
      });
      break;
  }
};
