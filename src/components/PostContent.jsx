"use client";

import { Loader2, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";

const PostList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch("/api/user_posts");
        const data = await response.json();
        setItems(data);
        setLoading(false);
      } catch (error) {
        console.log("Erro ao buscar os posts:", error);
      }
    }

    fetchItems();
  }, []);

  
  if(loading){
    return(
      <div>
        <Loader2 className="mt-2 animate-spin" />
      </div>
    )
  } if(items.length == 0){
    <div>
      <p>Tivemos um erro ao encontrar os posts...</p>
    </div>
  } else{
    return (
      <div>
        <a className="fixed bottom-5 right-5 bg-zinc-800 p-2 rounded-full transition hover:bg-zinc-700" href="/login">
          <Plus />
        </a>
        {/* <h1>Lista de Posts</h1> */}
        {items.map((post) => (
          <a href={`/posts/${post._id}`} className="hover:text-zinc-300" key={post.id}>
            <h2 className="mt-3">
              {post.title.length > 80
                ? `${post.title.slice(0, 80)}...`
                : post.title}
            </h2>
            <div className="flex justify-between items-end font-thin text-sm">
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
  }
};

export default PostList;
