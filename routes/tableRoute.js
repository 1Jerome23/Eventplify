const { Router } = require("express");
const hbs = require("hbs");
const tableController = require("../controllers/tableController");
const mongoose = require("mongoose");
const User = require("../models/User");
const Event = require("../models/Event");
const Table = require("../models/Table");
const Guest = require("../models/Guest");
const router = Router();
const { format, parse } = require("date-fns");

router.get("/tables", async (req, res) => {
  //var eventID = "6670eaea9dc29d82305a6761"; // Can be modified if the base events module is created
  var eventID = req.body.id || "6670eaea9dc29d82305a6761"; // Can be modified if the base events module is created

  var tables = await Table.find({ isSaved: true });

  try {
    const res = await Table.deleteMany({ isSaved: false });
    console.log("Unsaved tables deleted:", res);
  } catch (err) {
    console.error("Error deleting unsaved tables:", err);
  }

  var hasTable;

  try {
    const guestRes = await Guest.find();

    guestRes.forEach((data) => {
      hasTable = false;
      if (data.table != null) {
        tables.forEach((table) => {
          if (data.table.toString() == table._id) hasTable = true;
        });
      }

      if (!hasTable) deleteGuest(data._id, eventID);
    });
  } catch (err) {
    console.error("Error listing guests:", err);
  }

  try {
    const tables = await Table.aggregate([
      {
        $match: {
          event: new mongoose.Types.ObjectId(eventID),
        },
      },
      {
        $lookup: {
          from: "guests", // the collection to join
          localField: "_id", // field from the Table collection
          foreignField: "table", // field from the Guest collection
          as: "guests", // the name of the new array field to add to the output documents
        },
      },
      { $unwind: "$guests" }, // Deconstructs the guests array
      {
        $group: {
          _id: "$_id", // Group by the table's _id
          event: { $first: "$event" },
          name: { $first: "$name" }, // Take the table's name
          guests: {
            $push: {
              // Push each guest into an array
              _id: "$guests._id",
              name: "$guests.name",
              category: "$guests.category",
              status: "$guests.status",
            },
          },
        },
      },
    ]);

    res.render("table", { tables, eventID: eventID });

    console.log(JSON.stringify(tables, null, 2));
  } catch (err) {
    console.error("Error performing aggregation:", err);
  }
});

router.get("/addTable", async (req, res) => {
  const table = await Table.findOne({ isSaved: false });
  var eventID = req.query.event;

  if (table == null) {
    const table = new Table({
      event: new mongoose.Types.ObjectId(eventID),
      name: null,
      isSaved: false,
    });

    try {
      await table.save();
      res.render("table_add", { table, event: eventID });
    } catch (error) {
      console.error("Error saving todo:", error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    //const table = await Table.findById(tableID);
    tableID = table._id.toString();
    const guests = await Guest.find({ table: tableID });
    res.render("table_add", { table, guests, event: eventID });
  }
});

router.get("/editTable", async (req, res) => {
  const tableID = req.query.id;
  const event = req.query.event;

  const table = await Table.findById(tableID);
  const guests = await Guest.find({ table: tableID });

  console.log(guests);

  console.log(tableID);
  console.log(event);
  res.render("table_edit", { table, guests, event });
});

router.get("/addGuestTable", async (req, res) => {
  const tableID = req.query.id;
  const event = req.query.event;
  const flag = req.query.flag;

  const table = await Table.findById(tableID);
  const guests = await Guest.find({ table: null });

  console.log(guests);

  console.log(tableID);
  res.render("table_add_guest", { table, guests, flag, event });
});

router.post("/deleteGuestTable", tableController.deleteGuest);
router.post("/addGuestTableSubmit", tableController.addGuest);
router.post("/editTableSubmit", tableController.editTable);
router.delete("/deleteTable/:id", tableController.deleteTable);

const deleteGuest = async (guestID, event) => {
  var updatedData = { table: null };

  console.log(guestID);

  try {
    const removeGuest = await Guest.updateOne({ _id: guestID }, updatedData);
    if (removeGuest) {
      console.log("delete successfully");
    } else {
      console.log("Guest not found");
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
    console.log("Internal Server Error");
  }
};

module.exports = router;
