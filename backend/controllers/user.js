const bcrypt = require("bcrypt");
const User = require("../models/user.model");

exports.createUser = async (req, res, next) => {
  let hash = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: hash,
  });
  console.log("user", user);
  user
    .save()
    .then((result) => {
      res.status(201).json({
        message: "User created",
        result: result,
      });
    })
    .catch((error) => {
      console.error("user.js", error);
      res.status(500).json({
        message: error,
      });
    });
};
