const mongoose = require("mongoose");
const uri =
  "mongodb+srv://rafik999:rafik999@cluster0.31v7w.mongodb.net/moonsDataBase?retryWrites=true&w=majority";
mongoose.connect(uri, console.log("db connected..."));
