import React, { useState, useEffect } from 'react';
import './Label.css';

const Label = () => {
  const [normalLabel, setLabel] = useState(null);

  // Fetch detailed information for this label
  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const response = await fetch(`/api/labels`);
        const data = await response.json();
        setLabel(data);
      } catch (error) {
        console.error('Error fetching detailed label info:', error);
        setLabel(null); // Handle error by setting normalLabel to null
      }
    };

    fetchLabels();
  }, []); // Fetch details whenever the label ID changes

  return (
    <div className="label-item">
      <h5 id = "label-artist">{normalLabel.Name || 'Unknown Name'}</h5>
    </div>
  );
};

export default Label;
