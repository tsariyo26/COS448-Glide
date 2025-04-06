const express = require('express');
const router = express.Router();
const { saveUserLocation } = require('./db');

router.post('/user-location', (req, res) => {
  const { latitude, longitude, timestamp } = req.body;

  if (!latitude || !longitude || !timestamp) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  saveUserLocation(latitude, longitude, timestamp, (err, result) => {
    if (err) {
      console.error("Failed to save location:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json({ message: "Location stored", id: result.id });
  });
});

module.exports = router;

