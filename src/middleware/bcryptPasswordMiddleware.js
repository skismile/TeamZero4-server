const customResponse = require("../utils/responceObject")
const bcrypt = require("bcryptjs")
exports.bcryptPassword = (req,res,next)=>{
    const {password} = req.body;

    if(password){
    
    req.body.password =bcrypt.hashSync(password,10)
    next()
    }else{
      res.send({
        ...customResponse.errorResponce,
        message: "Please provide password",
      });
    }
      
    }