// routes/waitTimes.js
const express = require('express');
const router = express.Router();
const { getWaitTimes } = require('../controllers/waitTimesController');

// Route to get mock or real-time TSA wait times
router.get('/', getWaitTimes);

module.exports = router;
