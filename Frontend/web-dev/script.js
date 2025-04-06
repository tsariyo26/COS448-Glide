// ========================
// 🧭 Mapbox Setup
// ========================
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2xpZGUyMDI1IiwiYSI6ImNtOTNuNjR4djA0b3cyam9nN3M4MW1jZnYifQ.FrUimsF4NgG6zbz2NJaFQw';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-73.7781, 40.6413], // JFK Airport
  zoom: 14
});

// ========================
// 📍 Geolocation & Save to Backend
// ========================
const baseURL = "http://localhost:5050/api"; // Update if deployed!

const geolocate = new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: true,
  showUserHeading: true
});

map.addControl(geolocate);

const jFK = new mapboxgl.Marker()
    .setLngLat([-73.7765, 40.6452]) // example coords
    .setPopup(new mapboxgl.Popup().setText("Shake Shack"))
    .addTo(map);

shakeShack.getElement().addEventListener('click', () => {
    directions.setOrigin([-73.7781, 40.6413]); // Set to User Distance (store in db)
    directions.setDestination([-73.7765, 40.6452]); // End: Shake Shack
});

geolocate.on('geolocate', function (e) {
  const lng = e.coords.longitude;
  const lat = e.coords.latitude;
  console.log('User location:', lat, lng);

  // Save to backend
  fetch(`${baseURL}/user-location`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      latitude: lat,
      longitude: lng,
      timestamp: new Date().toISOString()
    })
  })
    .then(res => res.json())
    .then(data => console.log("Location saved:", data))
    .catch(err => console.error("Error saving location:", err));
});

// ========================
// 🌐 DOM Ready
// ========================
window.addEventListener("DOMContentLoaded", () => {
  fetchWaitTimes();
  fetchAmenities("JFK");
  document.getElementById("searchBtn").addEventListener("click", handleSearch);
  document.getElementById("closePopupBtn").addEventListener("click", () => {
    document.getElementById("directionsPopup").style.display = "none";
  });
});

// ========================
// ⏱ Mock TSA Wait Times
// ========================
function fetchWaitTimes() {
  fetch(`${baseURL}/wait-times`)
    .then(res => res.json())
    .then(data => {
      console.log("Security Wait Times:", data);
      // TODO: Display this in the UI if needed
    })
    .catch(err => console.error("Error fetching wait times:", err));
}

// ========================
// 🗺 Fetch Amenities
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
  fetchAmenities("JFK"); // Extend this to use search input if needed
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

      document.getElementById("directionsTo").textContent = end;
      document.getElementById("fastestRoute").innerHTML = `
        Path: ${data.path.join(" → ")}<br/>
        Distance: ${data.distance}
      `;
      document.getElementById("directionsPopup").style.display = "block";

      // Draw route on map
      if (map.getSource('route')) {
        map.removeLayer('route');
        map.removeSource('route');
      }

      const coordinates = data.coordinates;
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

// ========================
// 🧪 Test Routes (Optional)
// ========================
// fetchRoute("Gate A1", "Gate D4");



