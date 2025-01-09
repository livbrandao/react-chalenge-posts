import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const createPost = async (newPost) => {
  const response = await api.post("/posts", newPost);
  return response.data;
};

export const updatePost = async (id, updatedPost) => {
  const response = await api.put(`/posts/${id}`, updatedPost);
  return response.data;
};

export const deletePost = async (id) => {
  await api.delete(`/posts/${id}`);
};

export default api;
