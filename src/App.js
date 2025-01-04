import React from 'react';
import Navbar from './components/Navbar';
import PostsList from './features/posts/PostsList';

function App() {
  return (
    <div className="App">
      <Navbar />
      <PostsList />
    </div>
  );
}

export default App;