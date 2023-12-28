

const express = require("express");
const router = express.Router();
const UserModel = require("../model/userModel/userModel")

//@controller imports 
const authController = require("../controller/api/authController")
const taskCategoryController = require("../controller/api/taskCategoryController")
const taskController = require("../controller/api/taskController")
const videoController = require("../controller/api/ourVideoController")


//@middlewares
const bcryptPassword = require('../middleware/bcryptPasswordMiddleware')
const tokenCheckMiddleware = require('../middleware/tokenCheckMiddleware')
// const currentDateGenerateMiddleware = require('../middleware/currentDateMiddleware')
const taskTodoDateMiddleware = require('../middleware/taskTodoDateMiddleWare')
const creationDateMiddleware = require('../middleware/creationDateMiddleware')
const taskCreationDateMiddleware = require('../middleware/taskCreateDateMiddleware')

//@router


// Auth
router.post("/signup",bcryptPassword.bcryptPassword,creationDateMiddleware,authController.userCreateAccount)
router.post("/signin",authController.signinUser)

// Video
router.post("/video/add",tokenCheckMiddleware.tokenCheckMiddleware,videoController.createOurVideoController)
router.post("/video/list",videoController.getOurVideoListController)


// TaskCategory
router.post("/taskcategory/create",tokenCheckMiddleware.tokenCheckMiddleware,taskCategoryController.createTaskCategoryController)
router.post("/taskcategory/list",tokenCheckMiddleware.tokenCheckMiddleware,taskCategoryController.getTaskCategoryListController)
router.post("/taskcategory/delete",tokenCheckMiddleware.tokenCheckMiddleware,taskCategoryController.deleteTaskCategoryController)

// Task
// 
router.post("/task/create",tokenCheckMiddleware.tokenCheckMiddleware,creationDateMiddleware,taskTodoDateMiddleware,taskCreationDateMiddleware,taskController.createTaskController)
router.post("/task/list",tokenCheckMiddleware.tokenCheckMiddleware,taskController.getTaskListController)
router.post("/task/details/:id",tokenCheckMiddleware.tokenCheckMiddleware,taskController.getTaskDetailsController)


module.exports=router;
