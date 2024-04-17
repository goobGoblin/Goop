import React, { useState, useEffect } from 'react';
import './GenrePage.css';
import Genre from '../Genre/Genre';

function GenrePage() {
  const [genres, setGenres] = useState([]);

  function fetchSubgenres(genreID) {
    fetch(`/api/subgenres?genreID=${genreID}`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched subgenres:', data);
      })
      .catch(error => {
        console.error('Error fetching subgenres:', error);
      });
  }

  function genreClicked(ID) {
    fetchSubgenres(ID);
  }

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
        <div key={index} className="main-genre-container" onClick={() => genreClicked(genre.GenreID)}>
          <h2>{genre.Name}</h2>
          <p>{genre.Description}</p>
          {genre.showDropdown ? <p id="123">TODO: ADD SUBGENRES FROM FETCH!</p> : null}
          <button onClick={() => {
            const updatedGenres = [...genres];
            updatedGenres[index].showDropdown = !updatedGenres[index].showDropdown;
            setGenres(updatedGenres);
          }}>
            Subgenres
          </button>
        </div>
      ))}

      <p className="easter-egg">🫶</p>

      {/* I commented this out because I didn't want to mess with other files (namely Genre.js), and wanted to get something working. */}
      {/* {genres.map((genre, index) => (
        <Genre key={index} genre={genre} />
      ))} */}
    </div>
  );
}

export default GenrePage;
