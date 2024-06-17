const port = process.env.PORT || 3000;

var express = require("express");
var app = new express();

const path = require("path"); // our path directory

app.use(express.static(path.join(__dirname, "public")));

/* For file uplods */
const fileUpload = require("express-fileupload");
app.use(fileUpload()); //initialize file upload middleware

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

var server = app.listen(port, "0.0.0.0", function () {
  console.log("Node server running at port " + port);
});
