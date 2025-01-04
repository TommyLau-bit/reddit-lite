import axios from 'axios';

const BASE_URL = 'https://www.reddit.com';

export const fetchPosts = async (subreddit) => {
  const response = await axios.get(`${BASE_URL}/r/${subreddit}/.json`);
  return response.data.data.children.map((child) => child.data);
};