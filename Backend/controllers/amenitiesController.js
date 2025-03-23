// controllers/amenitiesController.js
const { fetchMockAmenities } = require('../services/amenitiesService');

const getAmenities = async (req, res) => {
  try {
    const data = await fetchMockAmenities(req.params.airportCode);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching amenities' });
  }
};

module.exports = { getAmenities };
