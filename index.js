const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
require("./config/connection.js");

const app = express();

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));
app.use(cors());

//routes
app.use(require("./routes/Routes"));

// error handler
app.use((err, req, res) => {
  return console.log("[Unhandled Error] => ", err.stack);
});
const port = process.env.PORT || 5000;

app.listen(port, console.log("application running..."));
