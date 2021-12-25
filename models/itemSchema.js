const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  itemType: {
    type: String,
  },
  itemPrice: {
    type: Number,
  },
  itemCategory: {
    type: String,
  },
  itemDescription: {
    type: String,
  },
});

const item = mongoose.model("Items", itemSchema);
module.exports = item;
