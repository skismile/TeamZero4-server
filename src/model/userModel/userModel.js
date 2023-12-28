const { Schema, model } = require("mongoose");

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const UserSchema = new Schema({
  userType: {
    type: String,
    required: [true, "User Type is required"],
    enum: ["user", "admin", "super admin", "other"],
    default: "user",
  },
  fullName: {
    type: String,
    required: [true, "Full Name is required"],
  },
  profilePicture: {
    type: String,
    required: [true, "Profile Picture is required"],
  },
  email: {
    type: String,
    required: [true, "Email Id is required"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validateEmail, "Invalid Emaild Address"],
  },
  mobileNo: {
    type: String,
    required: [true, "Mobile No  is required"],
    unique: true,
    minlength: [10, "Number should be greater or equal to 10 "],
    maxlength: [10, "Number should be less or equal to 10  "],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password should be greater or equal to 6"],
  },
  userStatus: {
    type: String,
    enum: ["active", "inactive", "blocked"],
    required: [true, "User Status is required"],
    default: "active",
  },
  
  signUpDate: {
    type: Date,
    required: [true, "Signup Date is required"],
   
  },

  signUpDateString: {
    type: String,
    required: [true, "signUpDate not found"],
  },
  signUpDateUnix: {
    type: String,
    required: [true, "signUpDate not found"],
  },

  dateOfBirth: {
    type: Date,
    required: [true, "Date of birth is required"],
  },
  dateOfBirthString: {
    type: String,
    required: [true, "dateOfBirthString is required"],
  },
  dateOfBirthUnix: {
    type: String,
    required: [true, "DateOfBirthUnix is required"],
   
  },

});

const UserModel = model("user", UserSchema);

module.exports = UserModel;
