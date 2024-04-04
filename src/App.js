// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GenrePage from './components/GenreComponents/GenrePage/GenrePage';
import AccountDropdown from './components/universal/AccountDropdown/AccountDropdown';
import NavigationBar from './components/universal/NavigationBar/NavigationBar';

function App() {
  return (
    <BrowserRouter>
      <div className="header-container">
        <NavigationBar />
      </div>
      <Routes>
        // Route to genre page by default
        
        {/* Define the route for the GenrePage */}
        <Route path="/genres" element={<GenrePage />} />
        {/* <Route path="/artists" element={<ArtistsPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
