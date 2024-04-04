// src/components/NavigationBar/NavigationBar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css'; // Import the CSS file for styling

const menuItems = [
  { id: 'genres', label: 'Genres', to: '/genres' },
  { id: 'artists', label: 'Artists' },
  { id: 'albums', label: 'Albums' },
  { id: 'mixes', label: 'Mixes' },
  { id: 'labels', label: 'Labels' },
  { id: 'account', label: 'Account'},
];

function NavigationBar() {
  const [selected, setSelected] = useState('genres');

  return (
    <nav className="navigation-bar">
          {menuItems.map((item) => (
            item.to ? (
              // Use Link for items with a 'to' property
              <Link
                to={item.to}
                key={item.id}
                className={`nav-item ${selected === item.id ? 'selected' : ''}`}
                onClick={() => setSelected(item.id)}
              >
                {item.label}
              </Link>
            ) : (
              // Fallback for items without a 'to' property
              <div
                key={item.id}
                className={`nav-item ${selected === item.id ? 'selected' : ''} ${item.label === 'Account' ? 'nav-item-account' : ''}`}
                onClick={() => setSelected(item.id)}
              >
                {item.label}
              </div>
            )
          ))}
        </nav>
  );
}

export default NavigationBar;
