import React, { useState, useEffect } from 'react';
import './GenrePage.css';
import Genre from '../Genre/Genre';

function GenrePage() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    // Dynamically import all JSON files from a specific folder
    function importAll(r) {
      return r.keys().map(r);
    }

    const genreData = importAll(require.context('../../../../data_handling/raw_data/Genres-JSON', false, /\.json$/));
    setGenres(genreData);
  }, []);

  return (
    <div className="genre-page-container">
      <h1>Genres</h1>
      <p className="description">Clicking on a genre will reveal several sub-genres.</p>
      {genres.map((genre, index) => (
        <Genre key={index} genre={genre} />
      ))}
    </div>
  );
}

export default GenrePage;
