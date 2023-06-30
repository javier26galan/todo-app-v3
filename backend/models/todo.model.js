const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user.model");


const todoSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: {type: Schema.ObjectId, ref:"User"}
});

module.exports = mongoose.model("User", todoSchema);
