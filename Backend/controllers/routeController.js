// controllers/routeController.js
const { getShortestPath } = require('../services/routeService');

const getPath = async (req, res) => {
  try {
    const { start, end } = req.body;
    const result = getShortestPath(start, end);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error finding route' });
  }
};

module.exports = { getPath };
