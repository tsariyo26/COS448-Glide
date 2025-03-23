// services/waitTimesService.js
const { getCache, setCache } = require('../utils/cache');

const CACHE_KEY = 'wait_times';
const TTL = 300000; // 5 minutes in milliseconds

const fetchMockWaitTimes = async () => {
  // Check cache first
  const cached = getCache(CACHE_KEY);
  if (cached) {
    return cached;
  }

  // Mock wait time generation
  const newData = {
    JFK: Math.floor(Math.random() * 20 + 5),
    LAX: Math.floor(Math.random() * 30 + 10),
    ATL: Math.floor(Math.random() * 15 + 5),
  };

  // Store in cache
  setCache(CACHE_KEY, newData, TTL);
  return newData;
};

module.exports = { fetchMockWaitTimes };
