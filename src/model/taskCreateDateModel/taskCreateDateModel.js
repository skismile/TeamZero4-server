const { Schema, model } = require("mongoose");
const dateFormet = require("../../utils/dateFormet");



const TaskCrateDateSchema = new Schema({
  createDate: {
    type: Date,
    unique:true,
    required: [true, "category create date is required"],
  },
  createDateString: {
    type: String,
    unique:true,
    required: [true, "create Date String is required"],
  },

  createDateUnix: {
    type: String,
    unique:true,
    required: [true, "create Date unix is required"],
  },
});

const TaskCreateDateModel = model("taskcreatedate", TaskCrateDateSchema);

module.exports = TaskCreateDateModel;
