const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();

exports.createUser = async (req, res, next) => {
  const { userName, email, password } = req.body;
  console.log(password);
  let hash = await bcrypt.hash(password, 10);
  const user = new User({
    userName: userName,
    email: email,
    password: hash,
    todosDone: 0,
  });
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

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "User did not exist" });
      }
      fetchedUser = user;
      console.log(fetchedUser);
      bcrypt.compare(req.body.password, fetchedUser.password).then((result) => {
        if (result) {
          const token = jwt.sign(
            {
              email: fetchedUser.email,
              _id: fetchedUser._id,
            },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
          );
          console.log(token);
          res.status(200).json({
            token: token,
            expiresIn: 36000,
            userId: fetchedUser._id,
            userName: fetchedUser.userName,
            todosDone: fetchedUser.todosDone,
          });
        } else {
          res.status(400).json({ message: "Invalid password" });
        }
      });
    })
    .catch((err) => {
      return res.status(401).json({ message: err });
    });
};

exports.updateTodosDone = (req, res, next) => {
  console.log("req.params.id", req.params.id);
  console.log("req.params.todosDone", req.params.todosDone);
  User.updateOne(
    { _id: req.params.id },
    { $set: { todosDone: req.params.todosDone } }
  )
    .then((result) => {
      console.log(result);
      if (result.modifiedCount > 0) {
        return res
          .status(200)
          .json({ message: "TodosDone updated Succesfully" });
      } else {
        return res.status(401).json({ message: "Invalid parameters" });
      }
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ message: "Error updating Todo", error: error });
    });
};
