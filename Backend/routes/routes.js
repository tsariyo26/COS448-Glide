// routes/routes.js
const express = require('express');
const router = express.Router();
const { getPath } = require('../controllers/routeController');

// Route to get optimized path between points in the airport
router.post('/', getPath);

module.exports = router;
