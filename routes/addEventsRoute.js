const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { addEvent, joinEvent  } = require('../controllers/EventController'); // Assuming addEvent function is defined in eventController

// Route to add a new event
router.post('/add', async (req, res) => {
  try {
    await addEvent(req, res); // Call the addEvent function from eventController
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to fetch all events
router.get('/events', async (req, res) => {
  try {
      if (!req.session.userId) {
          return res.status(401).json({ error: 'Unauthorized' });
      }
      console.log('User ID:', req.session.userId);
      const events = await Event.find({ owner: req.session.userId });

      res.status(200).json(events);
  } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to join an event using a unique code
router.post('/join', async (req, res) => {
  try {
    await joinEvent(req, res); // Call the joinEvent function from eventController
  } catch (error) {
    console.error('Error joining event:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:eventId', async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    console.error('Error fetching event details:', error);
    res.status(500).json({ error: 'An error occurred while fetching the event details.' });
  }
});

module.exports = router;
