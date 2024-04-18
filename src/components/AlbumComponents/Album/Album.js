// Album.js
import React from 'react';
import './Album.css';

const Album = ({ album }) => {
  return (
    <div className="album-item">
      <h5>{album.Title}</h5>
      <p>{album.ArtistID}</p>
      {/* Add more album details as needed */}
    </div>
  );
};

export default Album;
