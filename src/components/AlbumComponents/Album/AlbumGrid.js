// AlbumGrid.js
import React from 'react';
import Album from '../Album/Album'
import './AlbumGrid.css';

const AlbumGrid = ({ albums }) => {
    console.log("AlbumGrid albums:", albums);  // Log to see what albums AlbumGrid is receiving

    if (!albums || albums.length === 0) return <p>No albums found.</p>;

    return (
        <div className="data-grid-container">
            {albums.map((album, index) => (
                <Album key={index} album={album} />
            ))}
        </div>
    );
};

export default AlbumGrid;