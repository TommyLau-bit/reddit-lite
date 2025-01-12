/* 	•	Centralizes all API-related logic.
	•	redditApi.js:
	•	Functions for interacting with the Reddit JSON API.
	•	Examples:
	•	fetchPosts: Fetches posts from a subreddit.
	•	fetchComments: Fetches comments for a specific post. */

import axios from 'axios';

const BASE_URL = 'https://www.reddit.com';
const cache = {}; // Simple in-memory cache

// Fetch posts from a subreddit
export const fetchPosts = async (subreddit) => {
  // Check the cache first
  if (cache[subreddit]) {
    return cache[subreddit];
  }

  try {
    const response = await axios.get(`${BASE_URL}/r/${subreddit}/.json`);
    const posts = response.data.data.children.map((child) => child.data);
    
    // Cache the results
    cache[subreddit] = posts;

    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts. Please try again later.');
  }
};