/*
	•	App-wide setup and configurations.
	•	store.js:
	•	Configures the Redux store and integrates slices. */

import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import searchReducer from '../features/search/searchSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    search: searchReducer,
  },
});