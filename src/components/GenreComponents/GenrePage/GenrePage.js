import React from 'react';
import './GenrePage.css'; // Import the CSS file for styling
import Genre from '../Genre/Genre'; 

function GenrePage() {
  return (
    <div className="genre-page-container">
      <h1>Genres</h1>
			<p className="description">Clicking on a genre will reveal several sub-genres. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed molestie pulvinar diam, a semper turpis iaculis eu. Suspendisse vel dapibus leo. Duis lacinia quam.</p>
      <Genre/> {/* Render the Genres component */}
    </div>
  );
}

export default GenrePage;
