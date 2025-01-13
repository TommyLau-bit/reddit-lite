import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import './PostDetail.css';

const PostDetail = ({ onVote, onVoteComment }) => {
  const { postId } = useParams();
  const location = useLocation();
  const [post, setPost] = useState(location.state?.post || null);
  const [userComments, setUserComments] = useState(location.state?.userComments || []);
  const [apiComments, setApiComments] = useState([]);
  const [error, setError] = useState(null);
  const [voteStatus, setVoteStatus] = useState({}); // Track votes for comments
  const [postVoteStatus, setPostVoteStatus] = useState(null); // Track vote for the post

  useEffect(() => {
    if (!post || apiComments.length === 0) {
      const fetchPostDetail = async () => {
        try {
          const response = await axios.get(
            `https://www.reddit.com/comments/${postId}.json`
          );
          const postData = response.data[0].data.children[0].data;
          const commentData = response.data[1].data.children.map((child) => ({
            ...child.data,
            votes: 0, // Initialize votes for comments
          }));

          setPost(postData);
          setApiComments(commentData);
        } catch (err) {
          console.error('Error fetching post details:', err);
          setError('Failed to load post details.');
        }
      };

      fetchPostDetail();
    }
  }, [postId, post, apiComments]);

  // Handle upvote or downvote for the post
  const handleVotePost = (type) => {
    onVote(post, type); // Update My Votes page
    setPostVoteStatus(type); // Update local vote status
  };

  // Handle upvote or downvote for a comment
  const handleVoteComment = (comment, type) => {
    onVoteComment(comment, type); // Update My Votes page
    setApiComments((prev) =>
      prev.map((c) =>
        c.id === comment.id
          ? {
              ...c,
              votes: type === 'upvote' ? c.votes + 1 : c.votes - 1,
            }
          : c
      )
    );
    setVoteStatus((prev) => ({
      ...prev,
      [comment.id]: type,
    }));
  };

  // Add a user comment
  const handleAddComment = () => {
    const comment = prompt('Add your comment:');
    if (comment) {
      const newComment = {
        id: `local-${Date.now()}`,
        body: comment,
        author: 'You',
        votes: 0,
      };
      setUserComments((prev) => [newComment, ...prev]);
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!post) {
    return <div>Loading post...</div>;
  }

  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <p>By {post.author}</p>

      {/* Votes Section */}
      <div className="votes">
        <button
          onClick={() => handleVotePost('upvote')}
          className={`vote-btn ${postVoteStatus === 'upvote' ? 'upvote-active' : ''}`}
        >
          &#x25B2; Upvote
        </button>
        <button
          onClick={() => handleVotePost('downvote')}
          className={`vote-btn ${postVoteStatus === 'downvote' ? 'downvote-active' : ''}`}
        >
          &#x25BC; Downvote
        </button>
      </div>

      {/* Post Content */}
      <div className="post-content">
        {post.selftext ? <p>{post.selftext}</p> : <p>No content available.</p>}
      </div>

      {/* Add Comment Button */}
      <button className="add-comment-btn" onClick={handleAddComment}>
        Add Comment
      </button>

      {/* Comments Section */}
      <h3>Comments</h3>
      <div className="comments">
        {/* User Comments */}
        {userComments.map((comment) => (
          <div key={comment.id} className="comment user-comment">
            <p>{comment.body}</p>
            <p>- {comment.author}</p>
          </div>
        ))}

        {/* API Comments */}
        {apiComments.map((comment) => (
          <div key={comment.id} className="comment">
            <p>{comment.body}</p>
            <p>- {comment.author}</p>
            <div className="comment-votes">
              <button
                onClick={() => handleVoteComment(comment, 'upvote')}
                className={`vote-btn ${
                  voteStatus[comment.id] === 'upvote' ? 'upvote-active' : ''
                }`}
              >
                &#x25B2;
              </button>
              <button
                onClick={() => handleVoteComment(comment, 'downvote')}
                className={`vote-btn ${
                  voteStatus[comment.id] === 'downvote' ? 'downvote-active' : ''
                }`}
              >
                &#x25BC;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetail;