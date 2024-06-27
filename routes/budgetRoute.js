const { Router } = require("express");
const hbs = require("hbs");
const budgetController = require("../controllers/budgetController");
const User = require("../models/User");
const Event = require("../models/Event");
const Budget = require("../models/Budget");
const router = Router();
const { format, parse } = require("date-fns");

router.get("/budget", async (req, res) => {
  //var eventID = req.query.id;
  var eventID = "667bd17dbf98e4a49621ddef"; // Can be modified if the base events module is created
  var budget = await Budget.find({ event: eventID });
  var event = await Event.findById(eventID);
  var budgetLimit = event.budget;

  var totalAmount = 0;

  budget.forEach((budget) => {
    totalAmount += budget.amount;
  });

  var amountLeft = event.budget - totalAmount;

  var formattedNumber = totalAmount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  totalAmount = formattedNumber;

  formattedNumber = amountLeft.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  amountLeft = formattedNumber;

  formattedNumber = budgetLimit.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  budgetLimit = formattedNumber;

  res.render("budget", { budget, totalAmount, event, amountLeft, budgetLimit });
});

router.get("/budgetAdd", async (req, res) => {
  const id = req.query.id;
  res.render("budget_add", { id });
});

router.get("/budgetEdit", async (req, res) => {
  const id = req.query.id;
  var budget = await Budget.findById(id);
  console.log(budget);
  res.render("budget_edit", { budget, id });
});

router.get("/setBudgetLimit", async (req, res) => {
  const id = req.query.id;

  var event = await Event.findById(id);
  console.log(event);
  res.render("budget_setLimit", { event });
});

router.post("/submitBudgetAdd", budgetController.addBudget);
router.post("/submitBudgetEdit", budgetController.editBudget);
router.post("/submitBudgetLimit", budgetController.editBudgetLimit);
router.delete("/deleteBudget/:id", budgetController.deleteBudget);

module.exports = router;
