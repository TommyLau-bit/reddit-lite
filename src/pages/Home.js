import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import PostsList from '../features/posts/PostsList';
import { searchPosts } from '../api/redditApi';

const Home = ({ onVote }) => {
  const [subreddit, setSubreddit] = useState('reactjs');
  const [posts, setPosts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const subreddits = ['reactjs', 'javascript', 'webdev', 'programming'];

  const handleSearch = async (query) => {
    setIsSearching(true);
    const results = await searchPosts(query);
    setPosts(results);
    setIsSearching(false);
  };

  return (
    <div className="home">
      <Navbar onSearch={handleSearch} />
      <div className="main-content">
        <Sidebar
          subreddits={subreddits}
          onSubredditSelect={(selected) => {
            setSubreddit(selected);
            setPosts([]);
          }}
        />
        {isSearching ? (
          <div>Searching...</div>
        ) : posts.length > 0 ? (
          <PostsList posts={posts} />
        ) : (
          <PostsList subreddit={subreddit} onVote={onVote} />
        )}
      </div>
    </div>
  );
};

export default Home;