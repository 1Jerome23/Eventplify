const { Router } = require("express");
const hbs = require("hbs");
const budgetController = require("../controllers/budgetController");
const User = require("../models/User");
const Event = require("../models/Event");
const Budget = require("../models/Budget");
const router = Router();
const { format, parse } = require("date-fns");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

router.get("/budget", async (req, res) => {
  var event = "6670eaea9dc29d82305a6761"; // Can be modified if the base events module is created
  var budget = await Budget.find({ event: event });

  var totalAmount = 0;

  budget.forEach((budget) => {
    totalAmount += budget.amount;
  });

  var formattedNumber = totalAmount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  totalAmount = formattedNumber;

  res.render("budget", { budget, totalAmount });
});

router.get("/budgetAdd", async (req, res) => {
  res.render("budget_add");
});

router.get("/budgetEdit", async (req, res) => {
  const id = req.query.id;
  var budget = await Budget.findById(id);
  console.log(budget);
  res.render("budget_edit", { budget });
});

router.post("/submitBudgetAdd", budgetController.addBudget);
router.post("/submitBudgetEdit", budgetController.editBudget);
router.delete("/deleteBudget/:id", budgetController.deleteBudget);

module.exports = router;
