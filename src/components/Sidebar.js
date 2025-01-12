// Lists popular subreddits and allows navigation between them.

import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Subreddits</h3>
      <ul>
        <li>React</li>
        <li>JavaScript</li>
        <li>WebDev</li>
        <li>Programming</li>
      </ul>
    </div>
  );
};

export default Sidebar;