const express = require("express");

const checkAuth = require("../middleware/check-auth");

const todosController = require("../controllers/todos.js");

const router = express.Router();

router.get("/", (req, res) => {
  console.log("todos routes");
});

router.post("/create", todosController.createTodos);

module.exports = router;
