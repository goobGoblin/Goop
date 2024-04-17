import React, { useState } from 'react';
import './Subgenre.css';

const Subgenre = ({ subgenre }) => {
  const [showSubgenres, setShowSubgenres] = useState(false);

  const toggleSubgenres = () => {
    setShowSubgenres(!showSubgenres);
  };

  return (
    <div className="subgenre-item">
      <h5 onClick={toggleSubgenres}>{subgenre.name}</h5>
      <p>{subgenre.description}</p>
      {subgenre.subgenres && showSubgenres && (
        <div className="nested-subgenres">
          {subgenre.subgenres.map((nested, index) => (
            <Subgenre key={index} subgenre={nested} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Subgenre;
