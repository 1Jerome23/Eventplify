const { Router } = require("express");
const hbs = require("hbs");
const profileController = require("../controllers/profileController");
const User = require("../models/User");
const router = Router();
const { format, parse } = require("date-fns");

router.get("/profile", async (req, res) => {
  //const userId = "6678ebfa40cbcf216a2c3c08"; // placeholder for user ID
  const userId = req.query.id || "6678ebfa40cbcf216a2c3c08"; // placeholder for user ID
  const user = await User.findById(userId);

  res.render("profile", { user });
});

router.get("/profileEdit", async (req, res) => {
  const userId = "6678ebfa40cbcf216a2c3c08"; // placeholder for user ID
  const user = await User.findById(userId);

  res.render("profile_edit", { user });
});

router.get("/profileChangePassword", async (req, res) => {
  const userId = "6678ebfa40cbcf216a2c3c08"; // placeholder for user ID
  const user = await User.findById(userId);

  res.render("profile_change_pw", { user });
});

router.post("/submitProfileEdit", profileController.editProfile);
router.post("/submitChangePassword", profileController.changePassword);

module.exports = router;
