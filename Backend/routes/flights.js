// routes/flights.js
const express = require('express');
const router = express.Router();
const { getFlightStatus } = require('../controllers/flightController');

// Route to get status of a specific flight by ID
router.get('/:flightId', getFlightStatus);

module.exports = router;
