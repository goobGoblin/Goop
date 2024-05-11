import React, { useState, useEffect } from 'react';
import './LabelPage.css';
import LabelGrid from '../Label/LabelGrid';
import Label from '../Label/Label';

function LabelPage() {
  const [labels, setLabels] = useState([]);

  // Fetch labels
  const fetchLabels = () => {
    let url = '/api/labels';

    fetch(`${url}`)
      .then(response => response.json())
      .then(data => {
        setLabels(data);
      })
      .catch(error => {
        console.error('Error fetching label info:', error);
      });
  };
  useEffect(() => {
    fetchLabels();
  }, []);

  return (
    <div className="label-page-container">
      <LabelGrid labels={labels} />
    </div>
  );
}

export default LabelPage;