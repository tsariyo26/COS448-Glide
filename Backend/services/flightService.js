// services/flightService.js

// Mock function to simulate flight status info
const fetchMockFlightStatus = async (flightId) => {
  return {
    flightId,
    status: 'On Time',
    departure: '2025-03-23T10:00:00Z',
    arrival: '2025-03-23T13:00:00Z',
  };
};

module.exports = { fetchMockFlightStatus };
