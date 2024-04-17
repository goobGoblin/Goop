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
      {/* do something */}
    </div>
  );
}

export default Genre;
