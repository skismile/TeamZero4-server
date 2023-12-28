const jwt = require("jsonwebtoken");
// const { Error } = require("mongoose");

exports.jwtVerify = ({ token, SECRET_CODE }) => {
  try {
    var res = jwt.verify(token, SECRET_CODE);

    return Promise.resolve(res);
  } catch (e) {
    return Promise.reject({ message: "Error In Jwt", error: e });
  }
};
exports.jwtSign = ({ data, SECRET_CODE }) => {
  try {
    var res = jwt.sign({ ...data }, SECRET_CODE, { expiresIn: "2d" });

    return Promise.resolve(res);
  } catch (e) {
    return Promise.reject({ message: "Error In Jwt", error: e });
  }
};
