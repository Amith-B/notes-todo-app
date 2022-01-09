const Todo = require("../models/todo");

exports.addTodo = (req, res) => {
  const {
    profile: { _id },
    body: { title, content, start, end },
  } = req;

  const todoTitle = title ? title : content.slice(0, 32);

  const todo = new Todo({
    user: _id,
    title: todoTitle,
    content,
    start,
    end,
  });

  todo.save((err, data) => {
    if (err) {
      return res.status(400).json({
        err: "Unable to save todo",
      });
    }
    res.json(data);
  });
};

exports.getTodos = (req, res) => {
  const {
    profile: { _id },
  } = req;

  Todo.find({ user: _id }).exec((err, todo) => {
    if (err || !todo) {
      return res.status(400).json({
        error: "Not able to get todo list",
      });
    }
    res.json(todo);
  });
};

exports.getTodoById = (req, res) => {
  const {
    params: { todoId },
    profile: { _id },
  } = req;

  Todo.find({ user: _id, _id: todoId }).exec((err, todo) => {
    if (err || !todo) {
      return res.status(400).json({
        error: "Not able to get todo",
      });
    }
    res.json(todo);
  });
};
