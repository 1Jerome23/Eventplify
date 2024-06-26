const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
var express = require("express");
var app = new express();
const dotenv = require("dotenv");
dotenv.config();
const connectionString = process.env.DATABASE_URL;
const session = require("express-session");

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
const addEventsRoute = require("./routes/addEventsRoute.js");
const budgetRouter = require("./routes/budgetRoute.js");
const profileRouter = require("./routes/profileRoute.js");
const tableRouter = require("./routes/tableRoute.js");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1800000 }, // 30 minutes
  })
);
app.use(async function (req, res, next) {
  if (req.session && req.session.userId) {
    try {
      req.user = await User.findById(req.session.userId);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});
app.get("/events", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await User.findById(req.session.userId).populate('joinedEvents');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const events = await Event.find({
      $or: [
        { owner: req.session.userId },
        { _id: { $in: user.joinedEvents } }
      ]
    });

    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});
app.get('/api/events/:id', async (req, res) => {
  try {
      const event = await Event.findById(req.params.id);
      if (!event) return res.status(404).send('Event not found');
      res.send(event);
  } catch (error) {
      res.status(500).send('Server error');
  }
});

// Update event by ID
app.put('/api/events/:id', async (req, res) => {
  try {
      const event = await Event.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true, runValidators: true }
      );
      if (!event) return res.status(404).send('Event not found');
      res.send(event);
  } catch (error) {
      res.status(500).send('Server error');
  }
});
app.delete('/api/events/:id', async (req, res) => {
  try {
      const event = await Event.findByIdAndDelete(req.params.id);
      if (!event) return res.status(404).send('Event not found');
      res.send({ message: 'Event deleted successfully' });
  } catch (error) {
      res.status(500).send('Server error');
  }
});

// Initializing handlebars
var hbs = require("hbs");
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "views", "partials"));

app.use("/", todoRouter);
app.use("/api/users", userRouter);
app.use("/api/events", addEventsRoute);
app.use("/", budgetRouter);
app.use("/", profileRouter);
app.use("/", tableRouter);

/* For file uploads */
const fileUpload = require("express-fileupload");
app.use(fileUpload()); //initialize file upload middleware

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home_unlogged.html"));
});

var server = app.listen(port, "0.0.0.0", function () {
  console.log("Node server running at port " + port);
});
