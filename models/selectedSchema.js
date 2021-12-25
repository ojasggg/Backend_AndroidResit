var mongoose = require("mongoose");
var User = require("./userSchema.js");
var Item = require("./itemSchema.js");
var SCHEMA = mongoose.Schema;

//jobs
const selectedSchema = new SCHEMA({
  userid: {
    type: SCHEMA.Types.ObjectId,
    ref: User,
  },
  itemid: {
    type: SCHEMA.Types.ObjectId,
    ref: Item,
  },
});

const Selected = mongoose.model("Selected", selectedSchema);

module.exports = Selected;
