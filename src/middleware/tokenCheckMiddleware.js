const jwtHandler = require("../utils/jwtHandler");
const dotenv = require("dotenv");
const SECRET_CODE = process.env.SECRET_CODE;
exports.tokenCheckMiddleware = async (req, res, next) => {
  const accessRoles = ["admin", "super admin", "user", "other"];

  const { token } = req.headers;

  if (token) {
    try {
      const jwtData = await jwtHandler.jwtVerify({ token, SECRET_CODE });

      if (jwtData && accessRoles.includes(jwtData.userType)) {
        req.headers.creatorId = jwtData.id;
        next();
      } else {
        return res.send({
          status: "faild",
          message: "Unauthorize",
          error: "You didn't have any access please contact Admin",
        });
      }
    } catch (e) {
      return res.send({
        status: "faild",
        message: "Something went wrong",
        error: e,
      });
    }
  } else {
    return res.send({
      status: "faild",
      message: "Unauthorize",
      error: "Please Provide Token, No Token Found",
    });
  }
};
