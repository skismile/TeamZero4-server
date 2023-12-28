const {Schema ,model} = require("mongoose")

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const currentDate = new Date();
currentDate.setHours(currentDate.getHours() + 5);
currentDate.setMinutes(currentDate.getMinutes() + 30);
const TaskCategorySchema = new Schema({

    createDate: {
        type: Date,
        required: [true,"category create date is required"],
        default: currentDate 
    },
    categoryName : {
        type: String,
        required: [true,"Category name required is required"],
        unique: true,
        uppercase:true
        
    },
    categoryType: {
        type: String,
        enum:["Personal","Work","Other"],
        required: [true,"categoryType is required"],
        trim: true ,
        default:"Other"
    },
    categoryImage: {
        type: String,
        required: [true,"category image is required"],
        trim: true ,
       
    },
    creatorId: {
        type: Schema.ObjectId ,
        ref:"user",
        required: [true,"creator id is required"],
        trim: true ,
       
    },




});

const TaskCategoryModel = model('taskcategory', TaskCategorySchema);

module.exports = TaskCategoryModel;