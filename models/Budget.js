const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  name: String,
  category: String,
  amount: Number,
});

const Budget = mongoose.model("Budget", BudgetSchema);

module.exports = Budget;
