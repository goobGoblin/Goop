import React, { useState, useEffect } from 'react';
import './AlbumPage.css';
import AlbumGrid from '../Album/AlbumGrid';
import Genre from '../../GenreComponents/Genre/Genre';
import Album from '../Album/Album';

function AlbumPage() {
  const Filter = 'Genre';
  const [albums, setAlbums] = useState({});
  const [genres, setGenres] = useState([]);
  
  const fetchAlbums = (genreID) => {
    fetch(`/api/albums/basic-album-by-genre/${genreID}`)
      .then(response => response.json())
      .then(data => {
        console.log("Basic Albums data:", data);
        setAlbums(prev => ({ ...prev, [genreID]: data }));
      })
      .catch(error => {
        console.error('Error fetching basic album info:', error);
      });
  };
  

  useEffect(() => {
    fetch('/api/genres')
      .then(response => response.json())
      .then(data => {
        setGenres(data);
      })
      .catch(error => {
        console.error('Error fetching genres:', error);
      });
  }, []);

  const handleGenreClick = (genreID) => {
    if (!albums[genreID]) {
      fetchAlbums(genreID);
    } else {
      // Toggle display of the albums for this genre
      setAlbums(prev => ({ ...prev, [genreID]: prev[genreID] ? null : prev[genreID] }));
    }
  };

  return (
    <div className="album-page-container">
      {genres.map(genre => (
        <div key={genre.GenreID} onClick={() => handleGenreClick(genre.GenreID)}>
          <Genre genre={genre} onGenreClick={handleGenreClick} />
          {albums[genre.GenreID] && (
            <AlbumGrid albums={albums[genre.GenreID]} />
          )}
        </div>
      ))}
    </div>
  );
}

export default AlbumPage;