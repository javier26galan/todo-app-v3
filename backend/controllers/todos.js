const Todo = require("../models/todo.model");
exports.createTodos = (req, res, next) => {
  const { title, content, userId } = req.body;
  const todo = new Todo({ title, content, userId });
  todo
    .save()
    .then((result) => {
      res.status(201).json({
        message: "todo created",
        result: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: error,
      });
    });
  console.log(todo);
};
