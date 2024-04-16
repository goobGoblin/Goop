// Subgenre.js
import React from 'react';
import './Subgenre.css'; // Import the CSS file for styling

const Subgenre = ({ name }) => (
  <div className="subgenre-item">
    <h5>{name}</h5>
  </div>
);

export default Subgenre;
