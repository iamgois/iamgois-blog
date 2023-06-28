"use client";

import React, { useEffect, useState } from "react";

const PostList = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Simulando um atraso de 2 segundos
    const delay = setTimeout(() => {
      fetchItems(items);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(delay);
  }, []);

  async function fetchItems() {
    try {
      const response = await fetch('/api/user_posts');
      const data = await response.json();
      setItems(data);
      console.log()
    } catch (error) {
      console.log('Erro ao buscar os posts:', error);
    }
  }

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      {/* <h1>Lista de Posts</h1> */}
      {items.map((post) => (
        <a href="" className="hover:text-zinc-300" key={post._id}>
          <h2 className="mt-3">{post.title.length > 80 ? `${post.title.slice(0, 80)}...` : post.title}</h2>
          <div className="flex justify-between font-thin text-sm">
            <p>{post.subtitle.length > 55 ? `${post.subtitle.slice(0, 55)}...` : post.subtitle}</p>
            <p className="text-xs text-zinc-400">{post.createdAt}</p>
          </div>
        </a>
      ))}
    </div>
  );
};

export default PostList;
