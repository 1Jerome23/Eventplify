const express = require('express');
const router = express.Router();
const { addEvent } = require('../controllers/EventController'); // Assuming addEvent function is defined in eventController

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
      const events = await getEvents(); // Assuming getEvents retrieves events from the database
      res.status(200).json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
