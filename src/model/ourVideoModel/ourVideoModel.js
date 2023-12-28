const { Schema, model } = require("mongoose");



const OurVideoSchema = new Schema({
 
  title: {
    type: String,
    required: [true, "title is required"],
  },
  videoURL: {
    type: String,
    required: [true, "Video Url is required"],
  },
  videoId: {
    type: String,
    required: [true, "Video Id is required"],
  },


  videoType: {
    type: String,
    enum: ["reels", "video", "other"],
    required: [true, "video type is required"],
  
  },
  videoPlatform: {
    type: String,
    enum: ["youtube", "facebook", "instagram"],
    required: [true, "Video Platform is required"],
  
  },
  createDate: {
    type: Date,
    required: [true, "Date is required"],
  },
  createDateString: {
    type: String,
    required: [true, " Date String is required"],
  },

  createDateUnix: {
    type: String,
    required: [true, " Date  unix is required"],
  },
  
  

});

const OurVideoModel = model("ourvideo", OurVideoSchema);

module.exports = OurVideoModel;
