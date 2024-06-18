const mongoose = require("mongoose");

const TableSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  name: String,
});

const Table = mongoose.model("Table", TableSchema);

module.exports = Table;
