"use client";

import React, { useEffect, useState } from 'react';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://blog.thenord.com.br/api/user_posts');
      console.log(response)
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.log('Erro ao buscar os posts:', error);
    }
  };

  return (
    <div>
      <h1>Lista de Posts</h1>
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.subtitle}</p>
          <p>{post.createdAt}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;