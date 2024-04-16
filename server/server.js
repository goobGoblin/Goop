// index.js

const express = require('express');
const mysql = require('mysql');
const fs = require('fs');

const app = express();
const port = 3000;

// Load database configuration from JSON file
const config = JSON.parse(fs.readFileSync('../config.json'));

// Create MySQL connection pool
const pool = mysql.createPool({
  host: config.db_host,
  user: config.db_user,
  password: config.db_passwd,
  database: config.db_database,
  port: config.db_port
});

// API endpoint to fetch subgenres
app.get('/api/subgenres', (req, res) => {
  // Fetch subgenres from the database
  pool.query('SELECT * FROM subgenres', (error, results) => {
    if (error) {
      console.error('Error fetching subgenres:', error);
      res.status(500).json({ error: 'Failed to fetch subgenres' });
    } else {
      res.json(results);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
