// App.jsx
import React from 'react';
import './App.css'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GenrePage from './components/GenreComponents/GenrePage/GenrePage';
import ArtistPage from './components/ArtistComponents/ArtistPage/ArtistPage';
import AlbumPage from './components/AlbumComponents/AlbumPage/AlbumPage';
import MixPage from './components/MixComponents/MixPage/MixPage';
import LabelPage from './components/LabelComponents/LabelPage/LabelPage';
import AccountDropdown from './components/universal/AccountDropdown/AccountDropdown';
import NavigationBar from './components/universal/NavigationBar/NavigationBar';

function App() {
  return (
		<BrowserRouter>
			<div className="app">
				{/* <div className="background-image"></div> */}
				<div className="noise-overlay"></div>
				<div className = "content">
					<div className="header-container">
						<NavigationBar />
					</div>
					<Routes>
						// Route to genre page by default
						
						{/* Define the route for the GenrePage */}
						<Route path="/genres" element={<GenrePage />} />
						<Route path="/artists" element={<ArtistPage />} />
						<Route path="/albums" element={<AlbumPage />} />
						<Route path="/mixes" element={<MixPage />} />
						<Route path="/labels" element={<LabelPage />} />
						<Route path="/account" element={<AccountDropdown />} />
						{/* <Route path="/artists" element={<ArtistsPage />} /> */}
					</Routes>
				</div>
			</div>
		</BrowserRouter>
  );
}

export default App;
