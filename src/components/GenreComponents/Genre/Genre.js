import React from 'react';
import './Genre.css'; // Import the CSS file for styling

const subgenres = [
  'Progressive Rock',
  'Psychedelic Rock',
  'Hard Rock',
  'Blues Rock',
  'Folk Rock',
  'Alternative Rock',
  'Indie Rock',
  'Punk Rock',
  'Grunge',
  'Classic Rock',
]; // Example subgenres

function Genres() {
  return (
    <div className="genres-container">
      <div className="subgenres-grid">
        {subgenres.map((subgenre, index) => (
          <div key={index} className="subgenre-item">
            <h5>{subgenre}</h5>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Genres;
