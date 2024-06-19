const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const connectionString = process.env.DATABASE_URL;
console.log(connectionString);
var express = require("express");
var app = new express();
try {
  mongoose.connect(connectionString);
  console.log("Connected to MongoDB successfully");
} catch (err) {
  console.error(err);
}

const path = require("path"); // our path directory

app.use(express.json()); // use json
app.use(express.urlencoded({ extended: true })); // files consist of more than strings
app.use(express.static("public"));

// Collection Initialization
const User = require("./models/User");
const Event = require("./models/Event");
const Guest = require("./models/Guest");
const Table = require("./models/Table");
const Todo = require("./models/Todo");
const Budget = require("./models/Budget");

// Routing Initialization
const todoRouter = require("./routes/todoRoute.js");

// Initializing handlebars
var hbs = require("hbs");
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "views", "partials"));

app.use("/", todoRouter);

/* For file uploads */
const fileUpload = require("express-fileupload");
app.use(fileUpload()); //initialize file upload middleware

app.get("/", async (req, res) => {
  res.redirect("/todo");
  //res.sendFile(path.join(__dirname, "public", "home.html"));
  var user = await User.findById("6670e38a9dc29d82305a675f");
  console.log(user);
});

var server = app.listen(port, "0.0.0.0", function () {
  console.log("Node server running at port " + port);
});
