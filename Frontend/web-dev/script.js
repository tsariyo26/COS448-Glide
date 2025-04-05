// script.js

// ========================
// 🧭 Mapbox Setup
// ========================
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2xpZGUyMDI1IiwiYSI6ImNtOTNuNjR4djA0b3cyam9nN3M4MW1jZnYifQ.FrUimsF4NgG6zbz2NJaFQw'; // Replace this with your token

const map = new mapboxgl.Map({
  container: 'map', // This should match the id in your index.html
  style: 'mapbox://styles/mapbox/streets-v11', // You can replace with a custom style later
  center: [-73.7781, 40.6413], // JFK Airport
  zoom: 14
});

// Add geolocation control to find user's current location
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true
  })
);

// ========================
// 🔧 Backend Integration
// ========================
const baseURL = "http://localhost:5050/api"; // Update if deployed!

window.addEventListener("DOMContentLoaded", () => {
  fetchWaitTimes();
  fetchAmenities("JFK"); // Load amenities on start
  document.getElementById("searchBtn").addEventListener("click", handleSearch);
  document.getElementById("closePopupBtn").addEventListener("click", () => {
    document.getElementById("directionsPopup").style.display = "none";
  });
});

// Get mock TSA wait times
function fetchWaitTimes() {
  fetch(`${baseURL}/wait-times`)
    .then(res => res.json())
    .then(data => {
      console.log("Security Wait Times:", data);
      // You can display this info in the UI if needed
    })
    .catch(err => console.error("Error fetching wait times:", err));
}

// ========================
// 📍 Amenities on the Map
// ========================
function fetchAmenities(airportCode) {
  fetch(`${baseURL}/amenities/${airportCode}`)
    .then(res => res.json())
    .then(data => {
      console.log("Amenities:", data);
      data.forEach(place => {
        new mapboxgl.Marker({ color: "purple" })
          .setLngLat([place.longitude, place.latitude])
          .setPopup(new mapboxgl.Popup().setText(place.name))
          .addTo(map);
      });
    })
    .catch(err => console.error("Error fetching amenities:", err));
}

function handleSearch() {
  // This could be extended to use search input
  fetchAmenities("JFK");
}

// ========================
// 🧠 Route Finder
// ========================
function fetchRoute(start, end) {
  fetch(`${baseURL}/routes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ start, end }),
  })
    .then(res => res.json())
    .then(data => {
      console.log("Shortest Route:", data);
      
      // Update popup
      document.getElementById("directionsTo").textContent = end;
      document.getElementById("fastestRoute").innerHTML = `
        Path: ${data.path.join(" → ")}<br/>
        Distance: ${data.distance}
      `;
      document.getElementById("directionsPopup").style.display = "block";

      // OPTIONAL: Draw the route path on the map
      if (map.getSource('route')) {
        map.removeLayer('route');
        map.removeSource('route');
      }

      const coordinates = data.coordinates; // Array of [lng, lat] from backend
      if (coordinates && coordinates.length > 0) {
        map.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: coordinates
            }
          }
        });

        map.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#ff3300',
            'line-width': 5
          }
        });
      }
    })
    .catch(err => console.error("Error fetching route:", err));
}

// Example manual route fetch for demo/testing:
// fetchRoute("Gate A1", "Gate D4");


