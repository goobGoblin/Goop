const express = require('express');
const mysql = require('mysql2');
const fs = require('fs');
const app = express();
const port = 3001;

// Grabbing from config.json (DO NOT PUSH CONFIG.JSON)
fs.readFile('../config.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading config.json:', err);
    return;
  }

  // Parse the JSON data
  const dbConfig = JSON.parse(data);

  // Create a MySQL connection
  const connection = mysql.createConnection(dbConfig);

  // Connect to the database
  connection.connect(error => {
    if (error) {
      return console.error('Error connecting to the database:', error);
    }
    console.log('Connected to the MySQL server.');
  });

  // API endpoint to fetch genres
  app.get('/api/genres', (req, res) => {
    connection.query('SELECT Name, Description FROM Genres', (error, results) => {
      if (error) {
        console.error('Error fetching genres:', error);
        return res.status(500).send('Error fetching genres');
      }
      res.json(results);
    });
  });

  // Start the server
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
