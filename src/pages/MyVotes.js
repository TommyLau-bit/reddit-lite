import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MyVotes.css';

const MyVotes = ({
    upvotedPosts,
    downvotedPosts,
    upvotedComments,
    downvotedComments,
  }) => {
    const navigate = useNavigate();
  
    return (
      <div className="my-votes-page">
        <h2>My Votes</h2>
  
        {/* Upvoted Posts */}
        <section>
          <h3>Upvoted Posts</h3>
          {upvotedPosts.length > 0 ? (
            upvotedPosts.map((post) => (
              <div key={post.id} onClick={() => navigate(`/post/${post.id}`)}>
                <h4>{post.title}</h4>
                <p>By {post.author}</p>
              </div>
            ))
          ) : (
            <p>No upvoted posts yet.</p>
          )}
        </section>
  
        {/* Downvoted Posts */}
        <section>
          <h3>Downvoted Posts</h3>
          {downvotedPosts.length > 0 ? (
            downvotedPosts.map((post) => (
              <div key={post.id} onClick={() => navigate(`/post/${post.id}`)}>
                <h4>{post.title}</h4>
                <p>By {post.author}</p>
              </div>
            ))
          ) : (
            <p>No downvoted posts yet.</p>
          )}
        </section>
  
        {/* Upvoted Comments */}
        <section>
          <h3>Upvoted Comments</h3>
          {upvotedComments.length > 0 ? (
            upvotedComments.map((comment) => (
              <div key={comment.id}>
                <p>{comment.body}</p>
                <p>- {comment.author}</p>
              </div>
            ))
          ) : (
            <p>No upvoted comments yet.</p>
          )}
        </section>
  
        {/* Downvoted Comments */}
        <section>
          <h3>Downvoted Comments</h3>
          {downvotedComments.length > 0 ? (
            downvotedComments.map((comment) => (
              <div key={comment.id}>
                <p>{comment.body}</p>
                <p>- {comment.author}</p>
              </div>
            ))
          ) : (
            <p>No downvoted comments yet.</p>
          )}
        </section>
      </div>
    );
  };
  
  export default MyVotes;