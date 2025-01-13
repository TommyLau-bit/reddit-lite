// Redux state for loading posts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPosts } from '../../api/redditApi';

// Thunk for loading posts
export const loadPosts = createAsyncThunk(
  'posts/loadPosts',
  async (subreddit) => {
    const posts = await fetchPosts(subreddit);
    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      author: post.author,
      thumbnail: post.thumbnail, // Include the thumbnail field
      votes: post.votes || 0, // Initialize votes if not present
    }));
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {
    updateVote: (state, action) => {
      const { postId, type } = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      if (post) {
        post.votes = type === 'upvote' ? post.votes + 1 : post.votes - 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(loadPosts.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

// Export the `updateVote` action for dispatching in components
export const { updateVote } = postsSlice.actions;

export default postsSlice.reducer;