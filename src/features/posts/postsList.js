import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadPosts } from './postsSlice';
import './PostsList.css';

const DEFAULT_IMAGE = 'https://via.placeholder.com/80?text=No+Image';

const PostsList = ({ subreddit, posts: customPosts, onVote }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector((state) => state.posts.posts);
  const isLoading = useSelector((state) => state.posts.isLoading);
  const [voteStatus, setVoteStatus] = useState({}); // Track votes for posts

  useEffect(() => {
    if (!customPosts && subreddit) {
      dispatch(loadPosts(subreddit));
    }
  }, [dispatch, subreddit, customPosts]);

  const handleVote = (post, type) => {
    onVote(post, type); // Pass the vote event to App.js
    setVoteStatus((prev) => ({
      ...prev,
      [post.id]: type,
    }));
  };

  const handlePostClick = (post) => {
    navigate(`/post/${post.id}`, {
      state: { post },
    });
  };

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
          onClick={() => handlePostClick(post)}
        >
          {/* Post Thumbnail */}
          <div className="post-thumbnail">
            <img
              src={post.thumbnail && post.thumbnail.startsWith('http') ? post.thumbnail : DEFAULT_IMAGE}
              alt={post.title}
            />
          </div>

          {/* Post Content */}
          <div className="post-content">
            <h3>{post.title}</h3>
            <p>By {post.author}</p>

            {/* Votes Section */}
            <div className="votes">
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigation
                  handleVote(post, 'upvote');
                }}
                className={`vote-btn ${
                  voteStatus[post.id] === 'upvote' ? 'upvote-active' : ''
                }`}
              >
                &#x25B2;
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleVote(post, 'downvote');
                }}
                className={`vote-btn ${
                  voteStatus[post.id] === 'downvote' ? 'downvote-active' : ''
                }`}
              >
                &#x25BC;
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsList;