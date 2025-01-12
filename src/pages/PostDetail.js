import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PostDetail.css';

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await axios.get(
          `https://www.reddit.com/comments/${postId}.json`
        );
        const postData = response.data[0].data.children[0].data;
        const commentData = response.data[1].data.children.map((child) => child.data);

        setPost(postData);
        setComments(commentData);
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchPostDetail();
  }, [postId]);

  if (!post) {
    return <div>Loading post...</div>;
  }

  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <p>By {post.author}</p>
      <div className="post-content">
        {post.selftext ? <p>{post.selftext}</p> : <p>No content available.</p>}
      </div>
      <h3>Comments</h3>
      <div className="comments">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p>{comment.body}</p>
            <p>- {comment.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetail;