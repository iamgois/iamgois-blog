"use client";

import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const PostList = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Simulando um atraso de 2 segundos
    const delay = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(delay);
  }, []);

  async function fetchItems() {
    try {
      const response = await fetch("/api/user_posts");
      const data = await response.json();
      setItems(data);
      console.log();
    } catch (error) {
      console.log("Erro ao buscar os posts:", error);
    }
  }

  if (loading) {

    fetchItems(items);

    return (
      <div className="flex items-center justify-center h-screen w-screen absolute top-0 left-0 bg-zinc-900">
        <Loader2 width={54} height={54} className="animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* <h1>Lista de Posts</h1> */}
      {items.map((post) => (
        <a href={`/posts/${post._id}`} className="hover:text-zinc-300" key={post.id}>
          <h2 className="mt-3">
            {post.title.length > 80
              ? `${post.title.slice(0, 80)}...`
              : post.title}
          </h2>
          <div className="flex justify-between font-thin text-sm">
            <p>
              {post.subtitle.length > 55
                ? `${post.subtitle.slice(0, 55)}...`
                : post.subtitle}
            </p>
            <p className="text-xs text-zinc-400">{post.createdAt}</p>
          </div>
        </a>
      ))}
    </div>
  );
};

export default PostList;
