import React, { useState, useEffect } from 'react';
import Genre from '../../GenreComponents/Genre/Genre';
import Artist from '../Artist/Artist';
import DataGrid from '../../universal/DataGrid/DataGrid';
import './ArtistPage.css';

function ArtistPage() {
  const [genres, setGenres] = useState([]);

  const fetchArtists = (genreID) => {
    fetch(`/api/artists?genreID=${genreID}`)
      .then(response => response.json())
      .then(data => {
        const newGenres = genres.map(genre => {
          if (genre.GenreID === genreID) {
            return { ...genre, artists: data, showArtists: !genre.showArtists };
          }
          return genre;
        });
        setGenres(newGenres);
      })
      .catch(error => {
        console.error('Error fetching artists:', error);
      });
  };

  useEffect(() => {
    fetch('/api/genres')
      .then(response => response.json())
      .then(data => {
        const updatedGenres = data.map(genre => ({
          ...genre,
          artists: [],
          showArtists: false
        }));
        setGenres(updatedGenres);
      })
      .catch(error => {
        console.error('Error fetching genres:', error);
      });
  }, []);

  return (
    <div className="artist-page-container">
      {genres.map((genre) => (
        <Genre key={genre.GenreID} genre={genre} onGenreClick={() => {
          if (!genre.artists.length) {
            fetchArtists(genre.GenreID);
          }
          const updatedGenres = genres.map(g => ({
            ...g,
            showArtists: g.GenreID === genre.GenreID ? !g.showArtists : g.showArtists
          }));
          setGenres(updatedGenres);
        }}/>
      ))}
      {genres.map((genre) => genre.showArtists && (
        <DataGrid key={genre.GenreID} items={genre.artists} Component={Artist} />
      ))}
    </div>
  );
}

export default ArtistPage;
