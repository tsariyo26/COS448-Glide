// routes/amenities.js
const express = require('express');
const router = express.Router();
const { getAmenities } = require('../controllers/amenitiesController');

// Route to get amenities for a given airport
router.get('/:airportCode', getAmenities);

module.exports = router;
