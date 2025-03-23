// controllers/flightController.js
const { fetchMockFlightStatus } = require('../services/flightService');

const getFlightStatus = async (req, res) => {
  try {
    const flight = await fetchMockFlightStatus(req.params.flightId);
    res.json(flight);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching flight info' });
  }
};

module.exports = { getFlightStatus };
