const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user.model");


const todoSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: {type: Schema.ObjectId, ref:"User", required:true}
});

module.exports = mongoose.model("Todo", todoSchema);
