// controllers/eventController.js

const Event = require('../models/Event');

// Function to generate a unique 5-digit code
const generateUniqueCode = async () => {
  let code;
  let isUnique = false;

  while (!isUnique) {
    code = Math.floor(10000 + Math.random() * 90000).toString(); // Generate a random 5-digit number
    const existingEvent = await Event.findOne({ code });

    if (!existingEvent) {
      isUnique = true; // Code is unique if no event with this code exists
    }
  }

  return code;
};

exports.addEvent = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { name, description, date, startTime, endTime, location } = req.body;

    const code = await generateUniqueCode(); // Generate the unique 5-digit code

    const newEvent = new Event({
      owner: req.session.userId, 
      name,
      description,
      date,
      startTime,
      endTime,
      location,
      code,
      participants: []
    });

    await newEvent.save();

    return res.status(200).json({ message: 'Event added successfully', event: newEvent });
  } catch (error) {
    console.error('Error adding event:', error);
    return res.status(500).json({ error: 'An error occurred while adding the event. Please try again.' });
  }
};

exports.getEvents = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const events = await Event.find({ owner: req.session.userId });

    return res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return res.status(500).json({ error: 'An error occurred while fetching events' });
  }
};

exports.joinEvent = async (req, res) => {
  try {
    const { name, code } = req.body;

    if (!name || !code) {
      console.error('Validation Error: Name and code are required');
      return res.status(400).json({ error: 'Name and code are required' });
    }

    const event = await Event.findOne({ code });

    if (!event) {
      console.error('Event not found with code:', code);
      return res.status(404).json({ error: 'Event not found' });
    }

    event.participants.push({ name });

    await event.save();

    return res.status(200).json({ message: 'Joined event successfully', event });
  } catch (error) {
    console.error('Error joining event:', error);
    return res.status(500).json({ error: 'An error occurred while joining the event. Please try again.' });
  }
};
