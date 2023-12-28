const UserModel = require("../../model/userModel/userModel");
const customResponse = require("../../utils/responceObject");
// const errorResponce = require("../../utils/responceObject")
const jwtHandler = require("../../utils/jwtHandler");
const SECRET_CODE = process.env.SECRET_CODE;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dateFormet = require("../../utils/dateFormet");

exports.userCreateAccount = async (req, res) => {
  const body = req.body;

  const dob = await dateFormet.currentDateGenerate({ date: body.dateOfBirth });

  try {
    const isExistingUser = await UserModel.findOne(
      {
        $or: [{ email: body.email }, { mobileNo: body.mobileNo }],
      },
      { _id: 1, email: 1, mobileNo: 1 }
    );

    if (isExistingUser) {
      return res.send({
        ...customResponse.errorResponce,
        error:
          isExistingUser.email == body.email &&
          isExistingUser.mobileNo == body.mobileNo
            ? "This Email and Number already register with us please use another"
            : isExistingUser.email == body.email
            ? "This Email id already register with us please use another"
            : isExistingUser.mobileNo == body.mobileNo
            ? "This Mobile No is already register with us please use another"
            : "User Already register with us please use another",
      });
    } else {
      const newbody = {
        fullName: body.fullName,
        email: body.email,
        mobileNo: body.mobileNo,
        password: body.password,
        signUpDate: body.creationDateObj.date,
        signUpDateString: body.creationDateObj.dateString,
        signUpDateUnix: body.creationDateObj.dateUnix,
        dateOfBirth: dob.date,
        dateOfBirthString: dob.dateString,
        dateOfBirthUnix: dob.dateUnix,
        profilePicture:body.profilePicture
      };
     
      const user = await UserModel.create({ ...newbody });

      res.send({
        ...customResponse.successResponce,
        message: "Account Created Successfully",
      });
    }
  } catch (e) {
    res.send({
      ...customResponse.errorResponce,
      error: e,
      erroeMessage: e.message,
    });
  }
};
exports.signinUser = async (req, res) => {
  const { email, password: typedPassword } = req.body;

  try {
    var user = await UserModel.findOne(
      { email },
      { fullName: 1, email: 1, _id: 1, password: 1, userType: 1 }
    );
    if (user) {
      const isPasswordMatch = await bcrypt.compareSync(
        typedPassword,
        user.password
      );

      if (isPasswordMatch) {
        const userData = {
          fullName: user.fullName,
          email: user.email,
          id: user.id,
          userType: user.userType,
        };
        const token = await jwtHandler.jwtSign({ data: userData, SECRET_CODE });
        if (token) {
          res.send({
            ...customResponse.successResponce,
            message: "Login Successfully",
            token: token,
          });
        } else {
          res.send({
            ...customResponse.errorResponce,
            message: "Unable to create token",
          });
        }
      } else {
        res.send({
          ...customResponse.errorResponce,
          message: "Invalid credential",
        });
      }
    } else {
      res.send({
        ...customResponse.errorResponce,
        message: "Invalid Credential",
      });
    }
  } catch (e) {
    res.send({
      ...customResponse.errorResponce,
      error: e,
      erroeMessage: e.message,
    });
  }
};
