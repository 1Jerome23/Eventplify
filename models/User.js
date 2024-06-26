const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  joinedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
