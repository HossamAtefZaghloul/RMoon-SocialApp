import { createContext, useState, useEffect } from "react";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState(() => {
    const storedPosts = localStorage.getItem("Posts");
    return storedPosts ? JSON.parse(storedPosts) : null;
  });
  useEffect(() => {
    if (posts) {
      localStorage.setItem("posts", JSON.stringify(posts));
    } else {
      localStorage.removeItem("posts");
    }
  }, [posts]);
  return (
    <PostsContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostsContext.Provider>
  );
};
