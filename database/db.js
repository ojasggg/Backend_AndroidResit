const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/ComputerBuild", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(function () {
    console.log("MongoDB Connected .........");
  })
  .catch(function (err) {
    console.log("error" + err);
  });
