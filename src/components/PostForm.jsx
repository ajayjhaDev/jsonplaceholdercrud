// src/components/PostForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const PostForm = ({ setPosts, selectedPost, setEditing }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (selectedPost) {
      setTitle(selectedPost.title);
      setBody(selectedPost.body);
    }
  }, [selectedPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedPost) {
      await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${selectedPost.id}`,
        {
          title,
          body,
        }
      );
      setPosts((posts) =>
        posts.map((post) =>
          post.id === selectedPost.id ? { ...post, title, body } : post
        )
      );
      setEditing(false);
      setTitle("");
      setBody("");
    } else {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          title,
          body,
        }
      );
      setPosts((posts) => [...posts, response.data]);
      setTitle("");
      setBody("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
        style={{ marginLeft: "20px" }}
      />
      <button type="submit" style={{ marginLeft: "20px" }}>
        {selectedPost ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
};

export default PostForm;
