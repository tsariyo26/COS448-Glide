const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.resolve(__dirname, 'glide.db'));

// Initialize the table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS user_locations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      timestamp TEXT NOT NULL
    );
  `);
});

function saveUserLocation(latitude, longitude, timestamp, callback) {
  const query = `
    INSERT INTO user_locations (latitude, longitude, timestamp)
    VALUES (?, ?, ?);
  `;
  db.run(query, [latitude, longitude, timestamp], function (err) {
    if (err) {
      return callback(err);
    }
    callback(null, { id: this.lastID });
  });
}

module.exports = {
  saveUserLocation
};
