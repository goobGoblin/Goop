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

  const handleGenreClick = (genreID) => {
      const genre = genres.find(g => g.GenreID === genreID);
      if (!genre.albums.length) {
        fetchAlbums(genreID);
      } else {
        toggleAlbumsDisplay(genreID);
      }
    };

  const toggleAlbumsDisplay = (genreID) => {
    const updatedGenres = genres.map(genre => ({
      ...genre,
      showAlbums: genre.GenreID === genreID ? !genre.showAlbums : genre.showAlbums
    }));
    setGenres(updatedGenres);
  };

  return (
    <div className="album-page-container">
      {genres.map(genre => (
        <div key={genre.GenreID}>
          <Genre genre={genre} onGenreClick={() => handleGenreClick(genre.GenreID)} />
          {genre.showAlbums && (
            <DataGrid key={`album-${genre.GenreID}`} items={genre.albums} Component={Album} />
          )}
        </div>
      ))}
    </div>
  );
}

export default AlbumPage;
