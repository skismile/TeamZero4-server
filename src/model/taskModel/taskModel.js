const {Schema ,model} = require("mongoose")

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const currentDate = new Date();
currentDate.setHours(currentDate.getHours() + 5);
currentDate.setMinutes(currentDate.getMinutes() + 30);
const TaskSchema = new Schema({

    createDateId: {
        type: Schema.ObjectId,
        required: [true,"create date id is required"],
       ref:"taskcreatedate"
    },
    todoDateId: {
        type: Schema.ObjectId,
        required: [true,"todoDate is required"],
       ref:"tasktododate"
    },
   
    creatorId: {
        type: Schema.ObjectId ,
        ref:"user",
        required: [true,"creator id is required"],
        trim: true ,
       
    },
    taskCategoryId: {
        type: Schema.ObjectId ,
        ref:"taskcategory",
        required: [true,"Task Category id is required"],
       
    },
    title: {
        type: String ,
        required: [true,"title is required"],
       
    },
    description: {
        type: String ,
        required: [true,"description is required"],
       
    },
    imageURL: {
        type: String ,
        required: [true,"image url is required"],
       
    },
    isCompleted: {
        type: Boolean ,
        required: [true,"is completed is required"],
        default:false
       
    },





});

const TaskModel = model('task', TaskSchema);

module.exports = TaskModel;