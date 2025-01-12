// Displays a list of posts fetched from the Reddit API.

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadPosts } from './postsSlice';
import './PostsList.css';

const PostsList = ({ subreddit = 'reactjs' }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const isLoading = useSelector((state) => state.posts.isLoading);
  const hasError = useSelector((state) => state.posts.hasError);
  const errorMessage = useSelector((state) => state.posts.errorMessage);

  useEffect(() => {
    dispatch(loadPosts(subreddit));
  }, [dispatch, subreddit]);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (hasError) {
    return <div className="error">{errorMessage}</div>;
  }

  return (
    <div className="posts-list">
      {posts.map((post) => (
        <div key={post.id} className="post">
          <h3>{post.title}</h3>
          <p>By {post.author}</p>
        </div>
      ))}
    </div>
  );
};

export default PostsList;