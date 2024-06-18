const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  name: String,
  date: String,
  status: String,
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
