const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  description: String,
  date: String,
  startTime: String,
  endTime: String,
  location: String,
  budget: Number,
  code: Number,
  participants: [{ name: String }],
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
