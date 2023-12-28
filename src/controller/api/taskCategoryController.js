const customResponse = require("../../utils/responceObject");
const TaskCategoryModel = require("../../model/taskCategoryModel/taskCategoryModel");

exports.createTaskCategoryController = async (req, res) => {
  const body = req.body;
  const { creatorId } = req.headers;
  try {
    await TaskCategoryModel.create({ ...body, creatorId });
    res.send({
      ...customResponse.successResponce,
      message: "Task Category created successfully",
    });
  } catch (e) {
    res.send({
      ...customResponse.errorResponce,
      errorMessage: e,
      error: e.message,
    });
  }
};
exports.getTaskCategoryListController = async (req, res) => {
  const body = req.body;
  const { creatorId } = req.headers;
  try {
    const taskCategoryList =  await TaskCategoryModel.find({ creatorId },{createDate:1,categoryName:1,categoryType:1,categoryImage:1});
    res.send({
      ...customResponse.successResponce,
      message: "Task Category list found",
      data:taskCategoryList
    });
  } catch (e) {
    res.send({
      ...customResponse.errorResponce,
      errorMssage: e,
      error: e.message,
    });
  }
};
exports.deleteTaskCategoryController = async (req, res) => {
  const {id} = req.body;
  const { creatorId } = req.headers;
  try {
   const  taskCategory = await TaskCategoryModel.findByIdAndDelete({ _id:id });

if(taskCategory){
 return   res.send({
        ...customResponse.successResponce,
        message: "Whole Task Deleted successfully",
        
      });
}else{
   return res.send({
        ...customResponse.errorResponce,
        error: "Invalid Task Id",
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
