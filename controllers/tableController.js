const Event = require("../models/Event");
const Table = require("../models/Table");
const Guest = require("../models/Guest");

exports.deleteGuest = async (req, res) => {
  const guestID = req.query.id;
  const event = req.query.event;
  var updatedData = { table: null };

  console.log(guestID);

  try {
    const removeGuest = await Guest.updateOne({ _id: guestID }, updatedData);
    if (removeGuest) {
      if (event == null) {
        res.json({ message: "Guest Deleted successfully", removeGuest });
      } else {
        res.redirect("/tables?event=" + event);
      }
    } else {
      res.status(404).json({ message: "Guest not found" });
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.addGuest = async (req, res) => {
  const guestlistdropdown = req.body.guestlistdropdown;
  const tableID = req.body.tableID;
  const flag = req.body.flag;
  const event = req.body.event;

  var updatedData = { table: tableID };

  try {
    const addGuest = await Guest.updateOne(
      { _id: guestlistdropdown },
      updatedData
    );
    if (addGuest) {
      if (flag == "edit") {
        res.redirect("/editTable?id=" + tableID + "&event=" + event);
      } else {
        res.redirect("/addTable?id=" + tableID + "event=" + event);
      }
    } else {
      res.status(404).json({ message: "Guest not found" });
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.editTable = async (req, res) => {
  const tableID = req.body.tableID;
  const tablename = req.body.tablename;
  const event = req.body.event;
  var updatedData = { name: tablename, isSaved: true };

  console.log(tableID);

  try {
    const editTable = await Table.updateOne({ _id: tableID }, updatedData);
    if (editTable) {
      res.redirect("/tables?event=" + event);
    } else {
      res.status(404).json({ message: "Table not found" });
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteTable = async (req, res) => {
  const tableID = req.params.id;
  console.log(tableID);

  try {
    const deletedTable = await Table.findByIdAndDelete(tableID);
    if (deletedTable) {
      res.json({ message: "Table deleted successfully", deletedTable });
      await Guest.updateMany({ table: tableID }, { table: null });
    } else {
      res.status(404).json({ message: "Table not found" });
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
