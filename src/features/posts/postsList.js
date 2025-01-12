import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadPosts } from './postsSlice';
import './PostsList.css';

const DEFAULT_IMAGE = 'https://via.placeholder.com/80?text=No+Image';

const PostsList = ({ subreddit, posts: customPosts }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector((state) => state.posts.posts);
  const isLoading = useSelector((state) => state.posts.isLoading);

  useEffect(() => {
    if (!customPosts && subreddit) {
      dispatch(loadPosts(subreddit));
    }
  }, [dispatch, subreddit, customPosts]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const postsToRender = customPosts || posts;

  return (
    <div className="posts-list">
      {postsToRender.map((post) => (
        <div
          key={post.id}
          className="post"
          onClick={() => navigate(`/post/${post.id}`)}
        >
          <div className="post-thumbnail">
            <img
              src={post.thumbnail && post.thumbnail.startsWith('http') ? post.thumbnail : DEFAULT_IMAGE}
              alt={post.title}
            />
          </div>
          <div className="post-content">
            <h3>{post.title}</h3>
            <p>By {post.author}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsList;