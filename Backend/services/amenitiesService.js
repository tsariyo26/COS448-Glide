// services/amenitiesService.js

// Mock function to return amenities for an airport
const fetchMockAmenities = async (airportCode) => {
  return [
    { name: 'Starbucks', type: 'coffee', terminal: 'A' },
    { name: 'Duty Free', type: 'shopping', terminal: 'B' },
    { name: 'Chick-fil-A', type: 'food', terminal: 'C' },
  ];
};

module.exports = { fetchMockAmenities };
