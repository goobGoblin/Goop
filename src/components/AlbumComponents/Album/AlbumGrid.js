import React from 'react';
import Album from './Album';
import './AlbumGrid.css';

const AlbumGrid = ({ albums }) => {
  if (!Array.isArray(albums)) {
    console.error('AlbumGrid expected an array, but received:', albums);
    return <div>No albums available or data is incorrect.</div>;
  }

  return (
    <div className="album-grid-container">
      {albums.map((album, index) => (
        <Album key={index} album={album} />
      ))}
    </div>
  );
};

export default AlbumGrid;
