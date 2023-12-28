const { Schema, model } = require("mongoose");
const dateFormet = require("../../utils/dateFormet");



const TaskTodoDateSchema = new Schema({
  createDate: {
    type: Date,
    unique:true,
    required: [true, "Todo date is required"],
  },
  createDateString: {
    type: String,
    unique:true,
    required: [true, "Todo Date String is required"],
  },

  createDateUnix: {
    type: String,
    unique:true,
    required: [true, "Todo Date  unix is required"],
  },
});

const TaskTodoDateModel = model("tasktododate", TaskTodoDateSchema);

module.exports = TaskTodoDateModel;
