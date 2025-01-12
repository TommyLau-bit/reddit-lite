// Displays the app logo, search bar, and user navigation.

import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Reddit Clone</h1>
      <input type="text" placeholder="Search Reddit" />
    </nav>
  );
};

export default Navbar;