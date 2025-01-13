import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import PostDetail from './pages/PostDetail';
import MyVotes from './pages/MyVotes';
import './App.css';

function App() {
  const [upvotedPosts, setUpvotedPosts] = useState([]);
  const [downvotedPosts, setDownvotedPosts] = useState([]);
  const [upvotedComments, setUpvotedComments] = useState([]); // Track upvoted comments
  const [downvotedComments, setDownvotedComments] = useState([]); // Track downvoted comments

  // Handle voting for posts
  const handleVote = (post, type) => {
    if (type === 'upvote') {
      setUpvotedPosts((prev) => [...prev.filter((p) => p.id !== post.id), post]);
      setDownvotedPosts((prev) => prev.filter((p) => p.id !== post.id));
    } else if (type === 'downvote') {
      setDownvotedPosts((prev) => [...prev.filter((p) => p.id !== post.id), post]);
      setUpvotedPosts((prev) => prev.filter((p) => p.id !== post.id));
    }
  };

  // Handle voting for comments
  const handleVoteComment = (comment, type) => {
    if (type === 'upvote') {
      setUpvotedComments((prev) => [
        ...prev.filter((c) => c.id !== comment.id),
        comment,
      ]);
      setDownvotedComments((prev) => prev.filter((c) => c.id !== comment.id));
    } else if (type === 'downvote') {
      setDownvotedComments((prev) => [
        ...prev.filter((c) => c.id !== comment.id),
        comment,
      ]);
      setUpvotedComments((prev) => prev.filter((c) => c.id !== comment.id));
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home onVote={handleVote} />}
        />
        <Route path="/search/:query" element={<SearchResults onVote={handleVote} />} />
        <Route
          path="/post/:postId"
          element={
            <PostDetail onVote={handleVote} onVoteComment={handleVoteComment} />
          }
        />
        <Route
          path="/my-votes"
          element={
            <MyVotes
              upvotedPosts={upvotedPosts}
              downvotedPosts={downvotedPosts}
              upvotedComments={upvotedComments}
              downvotedComments={downvotedComments}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;