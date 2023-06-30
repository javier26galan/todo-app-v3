const bcrypt = require("bcrypt");
const User = require("../models/user.model");

exports.createUser = async (req, res, next) => {
  const { userName, email, password } = req.body;
  let hash = await bcrypt.hash(password, 10);
  const user = new User({
    userName: userName,
    email: email,
    password: hash,
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
        console.log(result);
        if (result) {
          res.status(200).json({message: "correct password"});
        }else{
          res.status(400).json({message: "Invalid password"})
        }
      });
    })
    .catch((err) => {
      return res.status(401).json({ message: err });
    });
};
