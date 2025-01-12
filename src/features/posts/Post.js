//A single post component displaying the title, author, upvotes, and comments.

import React from 'react';
import './Post.css';

const Post = ({ post }) => {
  return (
    <div className="post">
      <img src={post.thumbnail} alt="Thumbnail" />
      <div className="post-info">
        <h3>{post.title}</h3>
        <p>By {post.author}</p>
        <div className="post-stats">
          <span>{post.upvotes} Upvotes</span>
          <span>{post.comments} Comments</span>
        </div>
      </div>
    </div>
  );
};

export default Post;