const customResponse = require("../utils/responceObject");
const dateFormet = require("../utils/dateFormet");
const TaskCreationDateModel = require("../model/taskCreateDateModel/taskCreateDateModel");

const taskCreateDateMiddleware = async (req, res, next) => {
  const body = req.body;
  const { creationDateObj } = body;
  //   const { todoDate: date } = body;

  // return res.send({body})
  try {
    // const creationDate = await dateFormet.currentDateGenerate({date:creationDateObj.date });

    const isCreationDateExist = await TaskCreationDateModel.findOne({
      createDateString: creationDateObj.dateString,
    });
    if (isCreationDateExist) {
      req.body.createDateId = isCreationDateExist._id;
      next();
    } else {
      const createTaskDateBody = {
        createDate: creationDateObj.date,
        createDateUnix: creationDateObj.dateUnix,
        createDateString: creationDateObj.dateString,
      };
      const taskCreateId = await TaskCreationDateModel.create(
        createTaskDateBody
      );
      if (taskCreateId) {
        req.body.createDateId = taskCreateId._id;
        next();
      } else {
        return res.send({
          ...customResponse.errorResponce,
          error: "Unable to create task create date",
        });
      }
    }
  } catch (e) {
    res.send({
      ...customResponse.errorResponce,
      errorMessage: e,
      error: e.message,
    });
  }
};
module.exports = taskCreateDateMiddleware;
