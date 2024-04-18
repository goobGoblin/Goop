import React, { useState, useEffect } from 'react';
import './Subgenre.css';

const Subgenre = ({ subgenre }) => {
  const [showSubgenres, setShowSubgenres] = useState(false);
  const [nestedSubgenres, setNestedSubgenres] = useState([]);

  // Function to toggle the visibility of nested subgenres
  const toggleSubgenres = () => {
    // If nested subgenres are already fetched, we simply toggle visibility
    setShowSubgenres(!showSubgenres);

    // Fetch nested subgenres if not already fetched
    if (nestedSubgenres.length === 0 && !showSubgenres) {
      fetch(`/api/subsubgenres?subgenreID=${subgenre.id}`)
        .then(response => response.json())
        .then(data => {
          setNestedSubgenres(data);
        })
        .catch(error => {
          console.error('Error fetching nested subgenres:', error);
        });
    }
  };

  return (
    <div className="subgenre-item">
      <h5 onClick={toggleSubgenres}>{subgenre.name}</h5>
      <p>{subgenre.description}</p>
      {showSubgenres && nestedSubgenres.length > 0 && (
        <div className="nested-subgenres">
          {nestedSubgenres.map((nested, index) => (
            <Subgenre key={index} subgenre={nested} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Subgenre;
