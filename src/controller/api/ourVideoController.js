
const customResponse = require("../../utils/responceObject");
const OurVideoModel = require("../../model/ourVideoModel/ourVideoModel");
const dateFormet = require("../../utils/dateFormet");
exports.createOurVideoController = async (req, res) => {
    const body = req.body;
    const { creatorId } = req.headers;
    try {
        const currentDate = new Date();
        const {date:createDate,dateString:createDateString,dateUnix:createDateUnix} = await dateFormet.currentDateGenerate({date:currentDate})
 
      await OurVideoModel.create({ ...body, creatorId,createDate,createDateString,createDateUnix });
      res.send({
        ...customResponse.successResponce,
        message: "video added successfully",
      });
    } catch (e) {
      res.send({
        ...customResponse.errorResponce,
        errorMessage: e,
        error: e.message,
      });
    }
  };
exports.getOurVideoListController = async (req, res) => {
 
  
    try {
    
    const data=  await OurVideoModel.find();
      res.send({
        ...customResponse.successResponce,
        message: "video list get successfully",
        data:data
      });
    } catch (e) {
      res.send({
        ...customResponse.errorResponce,
        errorMessage: e,
        error: e.message,
      });
    }
  };