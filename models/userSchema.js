const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile_pic: {
    type: String,
    default: "no pic",
  },

  location: {
    type: String,
  },

  email: {
    type: String,
    required: "Email address required",
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  usertype: {
    type: String,
    required: true,
    enum: ["admin", "user"],
    default: "user",
  },
  phonenumber: {
    type: String,
    default: "98XXXXXXXX",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
