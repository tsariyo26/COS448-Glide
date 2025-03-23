// services/waitTimesService.js

// Mock function to simulate TSA/security wait times
const fetchMockWaitTimes = async () => {
  return {
    JFK: Math.floor(Math.random() * 20 + 5),
    LAX: Math.floor(Math.random() * 30 + 10),
    ATL: Math.floor(Math.random() * 15 + 5),
  };
};

module.exports = { fetchMockWaitTimes };
