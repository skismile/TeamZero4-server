const customResponse = require("../utils/responceObject");
const dateFormet = require("../utils/dateFormet");
const creationDateMiddleware = async (req, res, next) => {
  try {
    const currentDate = new Date();
   
   
   const creationDateObj = await dateFormet.currentDateGenerate({date:currentDate})
if(creationDateObj){

    req.body.creationDateObj= creationDateObj;
    next()
}else{
return  res.send({ ...customResponse, message:"Unable to generate creation date" });
}
   
  

 
  } catch (e) {
    res.send({ ...customResponse, errorMessage: e, message: e.message });
  }
};
module.exports = creationDateMiddleware;
