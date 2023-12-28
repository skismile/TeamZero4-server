const customResponse = require("../../utils/responceObject");
const TaskModel = require("../../model/taskModel/taskModel");
const TaskCreateDateModel = require("../../model/taskCreateDateModel/taskCreateDateModel");
const dateFormet = require("../../utils/dateFormet");
exports.createTaskController = async (req, res) => {
  const body = req.body;
  const {
    createDateId,
    todoDateId,
    taskCategoryId,
    title,
    description,
    imageURL,
  } = body;
  const { creatorId } = req.headers;

  try {
    const newBody = {
      createDateId,
      todoDateId,
      taskCategoryId,
      title,
      description,
      imageURL,
      creatorId,
    };

    const task = await TaskModel.create(newBody);

    if (task) {
      return res.send({
        ...customResponse.successResponce,
        message: "Task created successfully",
      });
    } else {
      return res.send({
        ...customResponse.errorResponce,
        errorMssage: e,
        error: "Unable to create task please try after sometime",
      });
    }
  } catch (e) {
    res.send({
      ...customResponse.errorResponce,
      errorMssage: e,
      error: e.message,
    });
  }
};
exports.getTaskListController = async (req, res) => {
  const body = req.body;

  const { creatorId } = req.headers;

  try {
    const tasks = await TaskModel.find(
      { creatorId },
      { creatorId: 0, __v: 0 }
    ).populate(["createDateId", "taskCategoryId", "todoDateId"]);
    //

    const newTaskData = [];
    for (let i = 0; i <= tasks.length; i++) {
      // var data = tasks[i]?.taskCategoryId;
      const newDataObj = {
        _id: tasks[i]?._id,
        createDateId: tasks[i]?.createDateId,
        todoDateId: tasks[i]?.todoDateId,
        title: tasks[i]?.title,
        description: tasks[i]?.description,
        imageURL: tasks[i]?.imageURL,
        isCompleted: tasks[i]?.isCompleted,
        taskCategoryId: {
          id: tasks[i]?.taskCategoryId._id,
          createDate: tasks[i]?.taskCategoryId.createDate,
          categoryName: tasks[i]?.taskCategoryId.categoryName,
          categoryType: tasks[i]?.taskCategoryId.categoryType,
          categoryImage: tasks[i]?.taskCategoryId.categoryImage,
        },
      };
      newTaskData.push(newDataObj);
    }

    return res.send({
      ...customResponse.successResponce,
      message: "Task List fetch successfully",
      data: newTaskData,
    });
  } catch (e) {
    res.send({
      ...customResponse.errorResponce,
      errorMssage: e,
      error: e.message,
    });
  }
};
exports.getTaskDetailsController = async (req, res) => {
  const body = req.body;
  const {id} = req.params
  const { creatorId } = req.headers;

  try {
    const tasks = await TaskModel.findOne(
      { creatorId,_id:id },
      { creatorId: 0, __v: 0 }
      ).populate(["createDateId", "taskCategoryId", "todoDateId"]);

        const newDataObj = {
          _id: tasks?._id,
          createDateId: tasks?.createDateId,
          todoDateId: tasks?.todoDateId,
          title: tasks?.title,
          description: tasks?.description,
          imageURL: tasks?.imageURL,
          isCompleted: tasks?.isCompleted,
          taskCategoryId: {
            id: tasks?.taskCategoryId._id,
            createDate: tasks?.taskCategoryId.createDate,
            categoryName: tasks?.taskCategoryId.categoryName,
            categoryType: tasks?.taskCategoryId.categoryType,
            categoryImage: tasks?.taskCategoryId.categoryImage,
          },
        };
     
   

    return res.send({
      ...customResponse.successResponce,
      message: "Task Details fetch successfully",
      data: newDataObj,
    });
  } catch (e) {
    res.send({
      ...customResponse.errorResponce,
      errorMssage: e,
      error: e.message,
    });
  }
};
