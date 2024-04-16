import React, { useState } from 'react';
import './Genre.css'; // Import the CSS file for styling
import Subgenre from '../Subgenre/Subgenre'; // Import the Subgenre component

// Example subgenres
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
];

function Genres() {
  const [showSubgenres, setShowSubgenres] = useState(false);

  const toggleSubgenres = () => {
    setShowSubgenres(!showSubgenres);
  };

  return (
    <div className="genres-container">
      <div className="main-genre-container" onClick={toggleSubgenres}>
        <h2>Main Genre</h2>
        <p>Main Genre Description</p>
      </div>
      {showSubgenres && (
        <div className="subgenres-grid">
          {subgenres.map((subgenre, index) => (
            <Subgenre key={index} name={subgenre} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Genres;
