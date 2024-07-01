const { Router } = require("express");
const hbs = require("hbs");
const todoController = require("../controllers/todoController");
const User = require("../models/User");
const Event = require("../models/Event");
const Todo = require("../models/Todo");
const router = Router();
const { format, parse } = require("date-fns");

router.get("/todo", async (req, res) => {
  //var event = "667bd17dbf98e4a49621ddef"; // Can be modified if the base events module is created
  var event = req.query.id || "667bd17dbf98e4a49621ddef";
  var todo = await Todo.find({ event: event }).sort({ date: 1 });

  todo.forEach((todo) => {
    var parsedDate = parse(todo.date, "yyyy-MM-dd", new Date());

    var formattedDate = format(parsedDate, "MMMM dd, yyyy");
    todo.date = formattedDate;
  });

  const groupedTodos = groupTodosByDate(todo);

  const todosArray = Object.keys(groupedTodos).map((date) => ({
    date,
    todos: groupedTodos[date].map((todo) => ({
      _id: todo._id.toString(), // Convert ObjectId to string if needed
      name: todo.name,
      status: todo.status,
    })),
  }));

  console.log(groupedTodos);
  res.render("todo", {
    todosArray,
    event,
  });
});

router.get("/addtodo", async (req, res) => {
  var event = req.query.id;
  res.render("todo_add", { event });
});

function groupTodosByDate(todos) {
  const groupedTodos = {};
  todos.forEach((todo) => {
    const date = todo.date;
    if (!groupedTodos[date]) {
      groupedTodos[date] = [];
    }
    groupedTodos[date].push(todo);
  });
  return groupedTodos;
}

router.get("/modifyTodoStatus", todoController.modifyTodo);
router.delete("/deleteTask/:id", todoController.deleteTask);
router.post("/todoSubmit", todoController.addTodo);

module.exports = router;
