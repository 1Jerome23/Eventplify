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

