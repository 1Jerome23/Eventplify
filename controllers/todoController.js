const Todo = require("../models/Todo");

exports.viewTodo = async (req, res) => {
  res.render("todo");
};
