const express = require('express');

const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const UserController = require('../controllers/user.js')

const router = express.Router();

router.get('/', (req, res) => {
  console.log("user routes");
})

router.post("/signup", UserController.createUser);
router.post("/login", UserController.userLogin);

module.exports = router;
