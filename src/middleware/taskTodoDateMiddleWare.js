const customResponse = require("../utils/responceObject");
const dateFormet = require("../utils/dateFormet");
const TaskTodoDateModel = require("../model/taskTodoDateModel/taskTodoDateModel");

const taskTodoDateMiddleware = async (req, res, next) => {
  const body = req.body;
  const { todoDate: date } = body;
  try {
    const tododate = await dateFormet.currentDateGenerate({ date });

    const isTodoExist = await TaskTodoDateModel.findOne({
      createDateString: tododate.dateString,
    });
    if (isTodoExist) {
      req.body.todoDateId = isTodoExist._id;

      next();
    } else {
      const taskTodoDateBody = {
        createDate: tododate.date,
        createDateUnix: tododate.dateUnix,
        createDateString: tododate.dateString,
      };
      const taskTodoId = await TaskTodoDateModel.create(taskTodoDateBody);

      req.body.todoDateId = taskTodoId._id;
      next();
    }

    // next()
  } catch (e) {
    res.send({
      ...customResponse.errorResponce,
      errorMessage: e,
      error: e.message,
    });
  }
};
module.exports = taskTodoDateMiddleware;
