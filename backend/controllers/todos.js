const Todo = require("../models/todo.model");

exports.getTodos = (req, res, next) => {
  Todo.find({ userId: req.params.id }).then((todos) => {
    console.log(todos);
    res.status(200).json({ message: "todos fetched successfully", todos: todos });
  }).catch((error) => {
    res.status(500).json({ message:"Erros fetching todos", error: error.message });
  });
};

exports.createTodo = (req, res, next) => {
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

exports.updateTodo = (req, res, next) => {
  const { title, content, userId } = req.body;
  const todo = new Todo({ _id: req.params.id, title, content, userId });
  Todo.updateOne({ _id: req.params.id }, todo)
    .then((result) => {
      console.log(result);
      if (result.modifiedCount > 0) {
        res.status(200).json({ message: "Todo Updated successfully" });
      } else {
        res.status(401).json({ message: "Invalid parameters" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Error updating Todo", error: error });
    });

  console.log(todo);
};

exports.deleteTodo = (req, res, next) => {
  Todo.deleteOne({ _id: req.params.id })
    .then((result) => {
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Todo deleted succcesfully :)" });
      } else {
        res.status(401).json({ message: "Not authorized :(" });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Fetching todo failed! :(", error: error });
    });
};
