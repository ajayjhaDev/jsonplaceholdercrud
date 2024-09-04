// src/components/PostDetails.js
import React from "react";

const PostDetails = ({ post }) => {
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
};

export default PostDetails;
