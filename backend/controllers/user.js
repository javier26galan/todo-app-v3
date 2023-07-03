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
          res
            .status(200)
            .json({ token: token, expiresIn: 36000, userId: fetchedUser._id });
        } else {
          res.status(400).json({ message: "Invalid password" });
        }
      });
    })
    .catch((err) => {
      return res.status(401).json({ message: err });
    });

};

