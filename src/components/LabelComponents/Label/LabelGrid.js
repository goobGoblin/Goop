import React from 'react';
import Label from './Label';
import './LabelGrid.css';

const LabelGrid = ({ labels }) => {
  if (!Array.isArray(labels)) {
    console.error('LabelGrid expected an array, but received:', labels);
    return <div>No labels available or data is incorrect.</div>;
  }

  return (
    <div className="label-grid-container">
      {labels.map((label, index) => (
        <Label key={index} label={label} />
      ))}
    </div>
  );
};

export default LabelGrid;
