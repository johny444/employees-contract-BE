const query = require("../Query/Result");

exports.ResultExcecute = (req, res) => {
  let { id, name, ACTION } = req.body;
  switch (ACTION) {
    case "GETAll":
      query.GetResultList(res);
      break;
    case "GETID":
      query.GetResultByID(id, res);
      break;
    case "DELETE":
      query.DelResult(id, res);
      break;
    case "INSERT":
      query.InsertResult(req, res);
      break;

    case "UPDATE":
      query.UpdateResult(req, res);
      break;

    default:
      res.send({
        message: `SERVER NOT EXIST THIS ACTION`,
      });
      break;
  }
};
