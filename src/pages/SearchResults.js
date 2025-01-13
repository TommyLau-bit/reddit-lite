import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { searchPosts } from '../api/redditApi';
import PostsList from '../features/posts/PostsList';
import './SearchResults.css';

const SearchResults = ({ onVote }) => {
  const { query } = useParams();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const results = await searchPosts(query);
        setPosts(results);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (isLoading) {
    return <div className="loading">Loading search results...</div>;
  }

  return (
    <div className="search-results">
      <h2>
        Search Results for <span className="highlight">"{query}"</span>
      </h2>
      {posts.length > 0 ? (
        <PostsList posts={posts} onVote={onVote}/>
      ) : (
        <div className="no-results">No results found for "{query}".</div>
      )}
    </div>
  );
};

export default SearchResults;