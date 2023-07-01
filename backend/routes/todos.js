const express = require("express");

const checkAuth = require("../middleware/check-auth");

const todosController = require("../controllers/todos.js");

const router = express.Router();

router.get("/:id", todosController.getTodos);
router.post("/create", todosController.createTodo);
router.put("/:id", todosController.updateTodo);
router.delete("/:id", todosController.deleteTodo);

module.exports = router;
