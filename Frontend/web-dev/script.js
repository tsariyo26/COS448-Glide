// script.js

// Grab elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const directionsPopup = document.getElementById('directionsPopup');
const closePopupBtn = document.getElementById('closePopupBtn');

/**
 * Simple search function:
 * If user types "Shake Shack", show the directions popup.
 * (In a real app, you'd perform an API call or a local map update.)
 */
searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim().toLowerCase();

  // Check if user typed "shake shack" or partial
  if (query.includes('shake shack')) {
    // Show the directions popup
    directionsPopup.style.display = 'block';
  } else {
    // Hide directions popup if open, or handle other searches
    directionsPopup.style.display = 'none';
    alert(`Searching for: ${searchInput.value}`);
  }
});

// Close popup on X button
closePopupBtn.addEventListener('click', () => {
  directionsPopup.style.display = 'none';
});

/**
 * Filter checkboxes (placeholder logic):
 * You could listen for change events on each checkbox
 * and update your map markers accordingly.
 */
const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
filterCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', (e) => {
    const amenityType = e.target.id; // e.g. 'shops', 'restaurants', etc.
    const isChecked = e.target.checked;
    console.log(`Filter for ${amenityType} is now ${isChecked ? 'ON' : 'OFF'}`);
    // In practice: Show/Hide those amenity markers on the map
  });
});

