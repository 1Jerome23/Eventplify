const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
var express = require("express");
var app = new express();
const dotenv = require('dotenv');
dotenv.config();
const connectionString = process.env.DATABASE_URL;
const session = require('express-session'); 


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
const userRouter = require("./routes/userRoute.js");

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1800000  } // 30 minutes
}));

// Initializing handlebars
var hbs = require("hbs");
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "views", "partials"));

app.use("/", todoRouter); 
app.use("/api/users", userRouter);

/* For file uploads */
const fileUpload = require("express-fileupload");
app.use(fileUpload()); //initialize file upload middleware

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home_unlogged.html'));
});

var server = app.listen(port, "0.0.0.0", function () {
  console.log("Node server running at port " + port);
});
