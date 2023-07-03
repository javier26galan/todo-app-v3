const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  userName: { type: String, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  todosDone: { type: Number }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
