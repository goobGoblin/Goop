import React, { useState, useEffect } from 'react';
import './GenrePage.css';
import Genre from '../Genre/Genre';

function GenrePage() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetch('/api/genres')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched genres:', data);  // Log the fetched data to see what it looks like
        setGenres(data);
      })
      .catch(error => {
        console.error('Error fetching genres:', error);
      });

    // Dynamically import all JSON files from a specific folder
    // function importAll(r) {
    //   return r.keys().map(r);
    // }

    // const genreData = importAll(require.context('../../../../data_handling/raw_data/Genres-JSON', false, /\.json$/));
    // setGenres(genreData);
  }, []);
  

  return (
    <div className="genre-page-container">
      <h1>Genres</h1>
      <p className="description">Clicking on a genre will reveal several sub-genres.</p>

      {genres.map((genre, index) => (
        <div key={index}>
          <h2>{genre.Name}</h2>
          <p>{genre.Description}</p>
        </div>
      ))}

      {/* I commented this out because I didn't want to mess with other files (namely Genre.js), and wanted to get something working. */}
      {/* {genres.map((genre, index) => (
        <Genre key={index} genre={genre} />
      ))} */}
    </div>
  );
}

export default GenrePage;
