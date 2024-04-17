import React, { useState } from 'react';
import './Genre.css';
import Subgenre from '../Subgenre/Subgenre';

function Genre({ genre }) {
  const [showSubgenres, setShowSubgenres] = useState(false);

  const toggleSubgenres = () => {
    setShowSubgenres(!showSubgenres);
  };

  return (
    <div className="genres-container">
      <div className="main-genre-container" onClick={toggleSubgenres}>
        <h2>{genre.genre}</h2>
        <p>{genre.description}</p>
      </div>
      {showSubgenres && (
        <div className="subgenres-grid">
          {genre.subgenres.map((subgenre, index) => (
            <Subgenre key={index} subgenre={subgenre} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Genre;
