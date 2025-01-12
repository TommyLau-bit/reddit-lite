//	Redux state for loading posts.
// Thunk for loading posts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPosts } from '../../api/redditApi';

export const loadPosts = createAsyncThunk(
  'posts/loadPosts',
  async (subreddit) => {
    const posts = await fetchPosts(subreddit);
    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      author: post.author,
      thumbnail: post.thumbnail, // Include the thumbnail field
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

export default postsSlice.reducer;