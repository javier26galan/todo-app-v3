const express = require("express");

const checkAuth = require("../middleware/check-auth");

const todosController = require("../controllers/todos.js");

const router = express.Router();

router.get("/:id", todosController.getTodos);
router.post("/create", checkAuth, todosController.createTodo);
router.put("/:id", checkAuth, todosController.updateTodo);
router.delete("/:id", checkAuth, todosController.deleteTodo);

module.exports = router;
