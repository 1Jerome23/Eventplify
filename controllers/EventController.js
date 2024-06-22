// controllers/eventController.js

const Event = require('../models/Event');

exports.addEvent = async (req, res) => {
  try {

    if (!req.user || !req.user._id) {
        return res.status(401).json({ error: 'Unauthorized' });
      
    }
    
    const { name, description, date, startTime, endTime, location } = req.body;

    const newEvent = new Event({ 
      owner: req.session.userId, // Assuming user ID is stored in req.session.userId
      name,
      description,
      date,
      startTime,
      endTime,
      location 
    });

    await newEvent.save();

    return res.status(200).json({ message: 'Event added successfully', event: newEvent });
  } catch (error) {
    console.error('Error adding event:', error);
    return res.status(500).json({ error: 'An error occurred while adding the event. Please try again.' });
  }
};

exports.updateEvent = async (req, res) => {
  const eventId = req.params.eventId;
  const { name, description, date, startTime, endTime, location } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(eventId, 
      { name, description, date, startTime, endTime, location },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    return res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (error) {
    console.error('Error updating event:', error);
    return res.status(500).json({ error: 'An error occurred while updating the event. Please try again.' });
  }
};

exports.deleteEvent = async (req, res) => {
  const eventId = req.params.eventId;

  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    
    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    return res.status(200).json({ message: 'Event deleted successfully', event: deletedEvent });
  } catch (error) {
    console.error('Error deleting event:', error);
    return res.status(500).json({ error: 'An error occurred while deleting the event. Please try again.' });
  }
};
