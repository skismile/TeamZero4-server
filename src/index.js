const dotenv = require("dotenv");
dotenv.config({ path: `.env` });
const compression = require('compression')
const PORT = process.env.PORT || 8080;
const dbConnect = require("./config/dbConnetion");
const express = require("express");
const cors = require("cors");
const app = express();

var api = require("./routes/api");
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));

const MONGO_URL = process.env.MONGO_URL;

// @middleware
app.use(compression())
app.use(cors());
app.use(express.json());
// @api
app.use("/api/", api);
app.get("/", (req, res) => {
  res.send("App is Listening");
});

app.listen(PORT, async () => {
  
  await dbConnect();

  console.log(`server is runing on port ${PORT}`);
});
