import type { Post, CreatePostData, SortOption } from '../types/post';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const fetchPosts = async (sort: SortOption = "random"): Promise<Post[]> => {
  const response = await fetch(`${API_BASE_URL}/api/posts?sort=${sort}`, {
    headers: {
      "Accept": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const createPost = async (postData: CreatePostData): Promise<Post> => {
  const response = await fetch(`${API_BASE_URL}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      title: postData.title,
      body: postData.content, // Map 'content' to 'body' for backend
    }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  // Backend now returns the post directly, not wrapped in {success, post}
  return data;
};
