/* 	•	Centralizes all API-related logic.
	•	redditApi.js:
	•	Functions for interacting with the Reddit JSON API.
	•	Examples:
	•	fetchPosts: Fetches posts from a subreddit.
	•	fetchComments: Fetches comments for a specific post. */
    import axios from 'axios';

    const BASE_URL = 'https://www.reddit.com';
    const cache = {};
    
    export const fetchPosts = async (subreddit) => {
      if (cache[subreddit]) return cache[subreddit];
    
      const response = await axios.get(`${BASE_URL}/r/${subreddit}/.json`);
      const posts = response.data.data.children.map((child) => child.data);
      cache[subreddit] = posts; // Cache results
      return posts;
    };
    
    export const searchPosts = async (query) => {
      const response = await axios.get(`${BASE_URL}/search.json?q=${query}`);
      return response.data.data.children.map((child) => child.data);
    };