const query = require("../Query/Student");

exports.StudentExcecute = (req, res) => {
  let { id, name, ACTION } = req.body;
  switch (ACTION) {
    case "GETAll":
      query.GetSTDList(res);
      break;
    case "GETID":
      query.GetSTDByID(id, res);
      break;
    case "DELETE":
      query.DelSTD(id, res);
      break;
    case "INSERT":
      query.InsertSTD(req, res);
      break;

    case "UPDATE":
      query.UpdateSTD(req, res);
      break;

    default:
      res.send({
        message: `SERVER NOT EXIST THIS ACTION`,
      });
      break;
  }
};
