const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const connectionString = process.env.DATABASE_URL;
console.log(connectionString);

try {
  mongoose.connect(connectionString);
  console.log("Connected to MongoDB successfully");
} catch (err) {
  console.error(err);
}

// Collection Initialization
const User = require("./models/User");
const Event = require("./models/Event");
const Guest = require("./models/Guest");
const Table = require("./models/Table");
const Todo = require("./models/Todo");
const Budget = require("./models/Budget");

var express = require("express");
var app = new express();

const path = require("path"); // our path directory

app.use(express.static("public"));

/* For file uploads */
const fileUpload = require("express-fileupload");
app.use(fileUpload()); //initialize file upload middleware

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
  var user = await User.findById("6670e38a9dc29d82305a675f");
  console.log(user);
});

var server = app.listen(port, "0.0.0.0", function () {
  console.log("Node server running at port " + port);
});
