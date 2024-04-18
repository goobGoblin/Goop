import React, { useState, useEffect } from 'react';
import './MixPage.css';
import Genre from '../../GenreComponents/Genre/Genre';
import DataGrid from '../../universal/DataGrid/DataGrid';
import Mix from '../Mix/Mix';  // Importing the Mix component

function MixPage() {
  const [genres, setGenres] = useState([]);

  const fetchMixes = (genreID) => {
    fetch(`/api/mixes?genreID=${genreID}`)
      .then(response => response.json())
      .then(data => {
        const newGenres = genres.map(genre => {
          if (genre.GenreID === genreID) {
            return { ...genre, mixes: data, showMixes: !genre.showMixes };
          }
          return genre;
        });
        setGenres(newGenres);
      })
      .catch(error => {
        console.error('Error fetching mixes:', error);
      });
  };

  useEffect(() => {
    fetch('/api/genres')
      .then(response => response.json())
      .then(data => {
        const updatedGenres = data.map(genre => ({
          ...genre,
          mixes: [],
          showMixes: false
        }));
        setGenres(updatedGenres);
      })
      .catch(error => {
        console.error('Error fetching genres:', error);
      });
  }, []);

  return (
    <div className="mix-page-container">
      <h1>Mixes by Genre</h1>
      {genres.map((genre) => (
        <Genre key={genre.GenreID} genre={genre} onGenreClick={() => {
          if (!genre.mixes.length) {
            fetchMixes(genre.GenreID);
          }
          const updatedGenres = genres.map(g => ({
            ...g,
            showMixes: g.GenreID === genre.GenreID ? !g.showMixes : g.showMixes
          }));
          setGenres(updatedGenres);
        }}/>
      ))}
      {genres.map((genre) => genre.showMixes && (
        <DataGrid key={genre.GenreID} items={genre.mixes} Component={Mix} />
      ))}
    </div>
  );
}

export default MixPage;
