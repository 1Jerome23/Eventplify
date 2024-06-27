const Todo = require("../models/Todo");

exports.addTodo = async (req, res) => {
  const taskname = req.body.taskname;
  const taskdate = req.body.taskdate;
  const taskstatus = req.body.taskstatus;
  const event = req.body.event;
  //const event = "6670eaea9dc29d82305a6761"; // Can be modified if the base events module is created

  console.log("event ID: " + event);

  const newTodo = new Todo({
    event: event,
    name: taskname,
    date: taskdate,
    status: taskstatus,
  });

  try {
    await newTodo.save();
    res.redirect("/todo?id=" + event);
  } catch (error) {
    console.error("Error saving todo:", error);
    res.status(500).send("Internal Server Error");
  }
  console.log(req.body);
};

exports.modifyTodo = async (req, res) => {
  const todoID = req.query.id;
  var todo = await Todo.findById(todoID);
  var updatedData = todo.status;

  if (updatedData == "unchecked") updatedData = { status: "checked" };
  else updatedData = { status: "unchecked" };

  console.log(todoID);

  try {
    const result = await Todo.updateOne({ _id: todoID }, updatedData);
    console.log("Update Result:", result);
    res.json({ message: "Todo status updated successfully", todo });
  } catch (error) {
    console.error("Error updating todo:", error);
    //res.status(500).send("Internal Server Error");
  }
};

exports.deleteTask = async (req, res) => {
  const todoID = req.params.id;
  var todo = await Todo.findById(todoID);

  console.log(todoID);

  try {
    const deletedTodo = await Todo.findByIdAndDelete(todoID);
    if (deletedTodo) {
      res.json({ message: "Todo deleted successfully", deletedTodo });
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
