import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "./services/api.js";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";

export function App() {
  const [editingPost, setEditingPost] = useState(null);
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const handleCreatePost = useMutation({
    mutationFn: createPost,
    onSuccess: (createdPost) => {
      queryClient.setQueryData(["posts"], (oldPosts) => {
        if (oldPosts) {
          return [...oldPosts, createdPost];
        }
        return [createdPost];
      });
      setMessage("Post criado com sucesso!");
    },
    onError: () => {
      setMessage("Erro ao criar o post. Tente novamente.");
    },
    onSettled: () => {
      setTimeout(() => setMessage(""), 3000);
    },
  });

  const handleUpdatePost = useMutation({
    mutationFn: updatePost,
    onSuccess: (updatedPost) => {
      queryClient.setQueryData(["posts"], (oldPosts = []) =>
        oldPosts.map((post) =>
          post.id === updatedPost.id ? updatedPost : post
        )
      );
      setEditingPost(null);
      setMessage("Post atualizado com sucesso!");
    },
    onError: () => {
      setMessage("Erro ao atualizar o post. Tente novamente.");
    },
    onSettled: () => {
      setTimeout(() => setMessage(""), 3000);
    },
  });

  const handleDeletePost = useMutation({
    mutationFn: deletePost,
    onSuccess: (_, id) => {
      queryClient.setQueryData(["posts"], (oldPosts = []) =>
        oldPosts.filter((post) => post.id !== id)
      );
      setMessage("Post excluído com sucesso!");
    },
    onError: () => {
      setMessage("Erro ao excluir o post. Tente novamente.");
    },
    onSettled: () => {
      setTimeout(() => setMessage(""), 3000);
    },
  });

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar posts: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-600 mb-6 uppercase">
        Gerenciador de Posts
      </h1>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        {message && (
          <div
            className={`mb-4 p-2 rounded-lg text-center ${
              message.includes("sucesso")
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}
        <PostForm
          onSubmit={
            editingPost
              ? (updatedPost) => handleUpdatePost.mutate(updatedPost)
              : (newPost) => handleCreatePost.mutate(newPost)
          }
          editingPost={editingPost}
          setEditingPost={setEditingPost}
        />
        <PostList
          posts={posts}
          onEdit={setEditingPost}
          onDelete={(id) => handleDeletePost.mutate(id)}
        />
      </div>
    </div>
  );
}
