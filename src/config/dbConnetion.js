const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;

const connect = () => {

   return mongoose.connect(MONGO_URL);
};

module.exports = connect;