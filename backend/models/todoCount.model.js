const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user.model");

const todoCountSchema = mongoose.Schema({
  done: { type: Number },
  userId: { type: Schema.ObjectId, ref: "User" },
});

module.exports = mongoose.model("TodoCount", todoSchema);
