// Lists popular subreddits and allows navigation between them.

import React from 'react';
import './Sidebar.css';

const Sidebar = ({ subreddits, onSubredditSelect }) => {
  return (
    <div className="sidebar">
      <h3>Subreddits</h3>
      <ul>
        {subreddits.map((subreddit) => (
          <li
            key={subreddit}
            onClick={() => onSubredditSelect(subreddit)}
            className="sidebar-item"
          >
            {subreddit}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;