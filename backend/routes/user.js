const express = require('express');

const checkAuth = require('../middleware/check-auth')

const UserController = require('../controllers/user.js')

const router = express.Router();

router.get('/', (req, res) => {
  console.log("user routes");
  console.log(req.params);
})
router.post("/signup", UserController.createUser);
router.post("/login", UserController.userLogin);
router.put("/todosDone/:id/:todosDone", UserController.updateTodosDone);

module.exports = router;
