// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const waitTimesRoutes = require('./routes/waitTimes');
const flightRoutes = require('./routes/flights');
const amenitiesRoutes = require('./routes/amenities');
const pathRoutes = require('./routes/routes');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/wait-times', waitTimesRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/amenities', amenitiesRoutes);
app.use('/api/routes', pathRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// routes/waitTimes.js
const express = require('express');
const router = express.Router();
const { getWaitTimes } = require('../controllers/waitTimesController');

router.get('/', getWaitTimes);

module.exports = router;


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


// services/waitTimesService.js
const fetchMockWaitTimes = async () => {
  return {
    JFK: Math.floor(Math.random() * 20 + 5),
    LAX: Math.floor(Math.random() * 30 + 10),
    ATL: Math.floor(Math.random() * 15 + 5),
  };
};

module.exports = { fetchMockWaitTimes };


// routes/flights.js
const express = require('express');
const router = express.Router();
const { getFlightStatus } = require('../controllers/flightController');

router.get('/:flightId', getFlightStatus);

module.exports = router;


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


// services/flightService.js
const fetchMockFlightStatus = async (flightId) => {
  return {
    flightId,
    status: 'On Time',
    departure: '2025-03-23T10:00:00Z',
    arrival: '2025-03-23T13:00:00Z'
  };
};

module.exports = { fetchMockFlightStatus };


// routes/amenities.js
const express = require('express');
const router = express.Router();
const { getAmenities } = require('../controllers/amenitiesController');

router.get('/:airportCode', getAmenities);

module.exports = router;


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


// services/amenitiesService.js
const fetchMockAmenities = async (airportCode) => {
  return [
    { name: 'Starbucks', type: 'coffee', terminal: 'A' },
    { name: 'Duty Free', type: 'shopping', terminal: 'B' },
    { name: 'Chick-fil-A', type: 'food', terminal: 'C' }
  ];
};

module.exports = { fetchMockAmenities };


// routes/routes.js
const express = require('express');
const router = express.Router();
const { getPath } = require('../controllers/routeController');

router.post('/', getPath);

module.exports = router;


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


// services/routeService.js
const graph = {
  A: { B: 5, C: 10 },
  B: { A: 5, C: 3, D: 9 },
  C: { A: 10, B: 3, D: 1 },
  D: { B: 9, C: 1 }
};

const getShortestPath = (start, end) => {
  const distances = {};
  const visited = {};
  const prev = {};

  Object.keys(graph).forEach(node => {
    distances[node] = Infinity;
    visited[node] = false;
  });
  distances[start] = 0;

  for (let i = 0; i < Object.keys(graph).length; i++) {
    let closest = null;
    Object.keys(graph).forEach(node => {
      if (!visited[node] && (closest === null || distances[node] < distances[closest])) {
        closest = node;
      }
    });

    visited[closest] = true;
    const neighbors = graph[closest];
    for (let neighbor in neighbors) {
      const newDist = distances[closest] + neighbors[neighbor];
      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        prev[neighbor] = closest;
      }
    }
  }

  const path = [];
  let curr = end;
  while (curr) {
    path.unshift(curr);
    curr = prev[curr];
  }
  return { path, distance: distances[end] };
};

module.exports = { getShortestPath };
