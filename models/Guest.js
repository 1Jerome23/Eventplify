const mongoose = require("mongoose");

const GuestSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
  },
  name: String,
  category: String,
  status: String,
});

const Guest = mongoose.model("Guest", GuestSchema);

module.exports = Guest;
