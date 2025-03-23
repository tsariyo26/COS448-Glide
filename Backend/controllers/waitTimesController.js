// controllers/waitTimesController.js
const { fetchMockWaitTimes } = require('../services/waitTimesService');

const getWaitTimes = async (req, res) => {
  try {
    const waitTimes = await fetchMockWaitTimes();
    res.json(waitTimes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wait times' });
  }
};

module.exports = { getWaitTimes };
