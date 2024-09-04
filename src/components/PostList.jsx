// src/components/PostList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import PostForm from "./PostForm";
import PostDetails from "./PostDetails";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(response.data);
    };

    fetchPosts();
  }, []);

  const handleEdit = (post) => {
    setSelectedPost(post);
    setEditing(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div>
      <h1>Posts</h1>
      <PostForm
        setPosts={setPosts}
        selectedPost={selectedPost}
        setEditing={setEditing}
      />
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <button onClick={() => handleEdit(post)}>Edit</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
