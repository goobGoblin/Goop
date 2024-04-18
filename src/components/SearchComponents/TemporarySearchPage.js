import React, { useState, useEffect } from 'react';
import './TemporarySearchPage.css';

function SearchPage() {
  function fetchTracksByID(genreID) {
    fetch(`/api/tracks?genreID=${genreID}`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched tracks:', data);
      })
      .catch(error => {
        console.error('Error fetching subgenres:', error);
      });
  }

  function fetchTracksByTitle(title) {
    fetch(`/api/search?title=${title}`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched tracks:', data);
      })
      .catch(error => {
        console.error('Error fetching subgenres:', error);
      });
  }

  useEffect(() => {
    
  }, []);
  

  const genreSearchClick = () => {
    let genre = document.getElementById("genreName").value;
    fetchTracksByID(genre);
  };

  const titleSearchClick = () => {
    let title = document.getElementById("songName").value;
    fetchTracksByTitle(title)
  }

  return (
    <div className="search-page-container">
      <h2>Search by Genre</h2>
      <select id="genreName">
        <option value="1">Ambient</option>
        <option value="2">Blues</option>
        <option value="3">Classical Music</option>
        <option value="4">Dance Music</option>
        <option value="5">Electronic</option>
        <option value="6">Industrial & Noise</option>
        <option value="7">Jazz</option>
        <option value="8">Metal</option>
        <option value="9">Musical Theater and Entertainment</option>
        <option value="10">New Age</option>
        <option value="11">Pop</option>
        <option value="12">Psychedelia</option>
        <option value="13">Punk</option>
        <option value="14">R&B</option>
        <option value="15">Singer-Songwriter</option>
        <option value="16">Spoken Word</option>
      </select>
      <button id="genreSearch" onClick={genreSearchClick}>Search</button>
      <h2>Search by Song Name</h2>
      <input type="text" id="songName" />
      <button id="titleSearch" onClick={titleSearchClick}>Search</button>
    </div>
  );
}

export default SearchPage;
