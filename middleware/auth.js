const jwt = require("jsonwebtoken");
const UserData = require("../models/user");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token, "tokentokentoken");
    const verify = jwt.verify(token, "hhhhh");
    req.user = await UserData.findById(verify.userId);
    console.log(req.user, "req.userreq.userreq.user");
    next();
  } catch (error) {
    return res.json({
      msg: "INVALID TOKEN",
    });
  }
};
