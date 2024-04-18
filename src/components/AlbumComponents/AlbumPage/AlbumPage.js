import React, { useState, useEffect } from 'react';
import Genre from '../../GenreComponents/Genre/Genre';
import Album from '../Album/Album';
import DataGrid from '../../universal/DataGrid/DataGrid';
import './AlbumPage.css';

function AlbumPage() {
  const [genres, setGenres] = useState([]);

  const fetchAlbums = (genreID) => {
    fetch(`/api/albums?genreID=${genreID}`)
      .then(response => response.json())
      .then(data => {
        const newGenres = genres.map(genre => {
          if (genre.GenreID === genreID) {
            return { ...genre, albums: data, showAlbums: !genre.showAlbums };
          }
          return genre;
        });
        setGenres(newGenres);
      })
      .catch(error => {
        console.error('Error fetching albums:', error);
      });
  };

  useEffect(() => {
    fetch('/api/genres')
      .then(response => response.json())
      .then(data => {
        const updatedGenres = data.map(genre => ({
          ...genre,
          albums: [],
          showAlbums: false
        }));
        setGenres(updatedGenres);
      })
      .catch(error => {
        console.error('Error fetching genres:', error);
      });
  }, []);

  return (
    <div className="album-page-container">
      <h1>Albums</h1>
      {genres.map((genre) => (
        <Genre key={genre.GenreID} genre={genre} onGenreClick={() => {
          if (!genre.albums.length) {
            fetchAlbums(genre.GenreID);
          }
          const updatedGenres = genres.map(g => ({
            ...g,
            showAlbums: g.GenreID === genre.GenreID ? !g.showAlbums : g.showAlbums
          }));
          setGenres(updatedGenres);
        }}/>
      ))}
      {genres.map((genre) => genre.showAlbums && (
        <DataGrid key={genre.GenreID} items={genre.albums} Component={Album} />
      ))}
    </div>
  );
}

export default AlbumPage;
