// script.js

const baseURL = "http://localhost:5000/api"; // Update if deployed!

window.addEventListener("DOMContentLoaded", () => {
  fetchWaitTimes();
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
      // You can add UI rendering here (e.g., show wait time for JFK)
    })
    .catch(err => console.error("Error fetching wait times:", err));
}

// Handle amenity search
function handleSearch() {
  const airportCode = "JFK"; // Change to dynamic input if needed
  fetch(`${baseURL}/amenities/${airportCode}`)
    .then(res => res.json())
    .then(data => {
      console.log("Amenities:", data);
      // You could dynamically overlay markers on the map here
    })
    .catch(err => console.error("Error fetching amenities:", err));
}

// Optional: Get directions between 2 points
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
      // Example: update the directions popup
      document.getElementById("directionsTo").textContent = end;
      document.getElementById("fastestRoute").innerHTML = `
        Path: ${data.path.join(" → ")}<br/>
        Distance: ${data.distance}
      `;
      document.getElementById("directionsPopup").style.display = "block";
    })
    .catch(err => console.error("Error fetching route:", err));
}

// Example: you can manually trigger route fetch for demo
// fetchRoute("A", "D");

