import React, { useState, useEffect } from 'react';
import './AlbumPage.css';
import AlbumGrid from '../Album/AlbumGrid';
import Album from '../Album/Album';

function AlbumPage() {
  const [genres, setGenres] = useState([]);
  const [albums, setAlbums] = useState({});

  const fetchAlbums = (genreID) => {
    fetch(`/api/albums/by-genre-id/${genreID}`)
      .then(response => {
        console.log(response); // Check the raw response
        return response.json();
      })
      .then(data => {
        console.log("Albums data:", data);
        setAlbums(prev => ({ ...prev, [genreID]: data }));
      })
      .catch(error => {
        console.error('Error fetching albums:', error);
      })
      .then(response => response.json())
      .then(data => {
        console.log("Albums data:", data);
        setAlbums(prev => ({ ...prev, [genreID]: data }));
      })
      .catch(error => {
        console.error('Error fetching albums:', error);
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
          <h3>{genre.Name}</h3>
          {albums[genre.GenreID] && (
            <AlbumGrid albums={albums[genre.GenreID]} />
          )}
        </div>
      ))}
    </div>
  );
}

export default AlbumPage;