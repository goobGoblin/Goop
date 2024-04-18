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
    const query = `
      SELECT Name, Description, GenreID
      FROM Genres
    `;
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching genres:', error);
        return res.status(500).send('Error fetching genres');
      }
      res.json(results);
    });
  });

  // API endpoint to fetch subgenres that match a certani genreID
  app.get('/api/subgenres', (req, res) => {
    const genreID = req.query.genreID;
    const query = `
      SELECT Subgenres.SubgenreName, Subgenres.Description
      FROM Subgenres
      INNER JOIN GenreSubgenre ON Subgenres.SubgenreID = GenreSubgenre.SubgenreID
      WHERE GenreSubgenre.GenreID = ${genreID}
    `;
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching subgenres:', error);
        return res.status(500).send('Error fetching subgenres');
      }
      res.json(results);
    });
  });

    // API endpoint to fetch tracks based off GenreID
    app.get('/api/tracks', (req, res) => {
      const genreID = req.query.genreID;
      const query = `
        SELECT Title, TrackID
        FROM Tracks
        WHERE GenreID = ${genreID}
      `;
      connection.query(query, (error, results) => {
        if (error) {
          console.error('Error fetching tracks:', error);
          return res.status(500).send('Error fetching tracks');
        }
        res.json(results);
      });
    });

    // API endpoint to search tracks by title
    app.get('/api/search', (req, res) => {
      const searchQuery = req.query.title;
      const query = `
        SELECT Title, TrackID
        FROM Tracks
        WHERE Title LIKE '%${searchQuery}%'
      `;
      connection.query(query, (error, results) => {
        if (error) {
          console.error('Error searching tracks:', error);
          return res.status(500).send('Error searching tracks');
        }
        res.json(results);
      });
    });

    // API endpoint to fetch artists based on genreID
    app.get('/api/artists', (req, res) => {
      const genreID = req.query.genreID;
      const query = `
        SELECT DISTINCT Artists.Name, Artists.Biography
        FROM Artists
        INNER JOIN Tracks ON Artists.ArtistID = Tracks.ArtistID
        WHERE Tracks.GenreID = ${genreID}
      `;
      connection.query(query, (error, results) => {
        if (error) {
          console.error('Error fetching artists:', error);
          return res.status(500).send('Error fetching artists');
        }
        res.json(results);
      });
    });

  // Start the server
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
