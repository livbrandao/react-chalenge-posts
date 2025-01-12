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
  const [editingPost, setEditingPost] = useState(null); // Armazena o post em edição
  const [message, setMessage] = useState(""); // Mensagem de feedback (sucesso ou erro)
  const queryClient = useQueryClient(); // Para controlar o cache de dados de posts

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
    onSuccess: (createdPost) =>
      handlePostMutationSuccess(createdPost, "criado"),
    onError: () => handlePostMutationError("criar"),
    onSettled: () => setTimeout(() => setMessage(""), 8000),
  });

  const handleUpdatePost = useMutation({
    mutationFn: (updatedPost) =>
      updatedPost.id <= 100
        ? Promise.resolve(updatedPost)
        : updatePost(updatedPost.id, updatedPost),
    onSuccess: (updatedPost) =>
      handlePostMutationSuccess(updatedPost, "atualizado"),
    onError: () => handlePostMutationError("atualizar"),
    onSettled: () => setTimeout(() => setMessage(""), 8000),
  });

  const handleDeletePost = useMutation({
    mutationFn: deletePost,
    onSuccess: (_, id) => {
      queryClient.setQueryData(["posts"], (oldPosts = []) =>
        oldPosts.filter((post) => post.id !== id)
      );
      setMessage("Post excluído com sucesso!");
    },
    onError: () => setMessage("Erro ao excluir o post. Tente novamente."),
    onSettled: () => setTimeout(() => setMessage(""), 8000),
  });

  // Abstração para tratamento de sucesso na mutação
  const handlePostMutationSuccess = (post, action) => {
    queryClient.setQueryData(["posts"], (oldPosts = []) =>
      action === "criado"
        ? [post, ...oldPosts] // Adiciona post criado no começo
        : oldPosts.map((existingPost) =>
            existingPost.id === post.id ? post : existingPost
          )
    );
    setEditingPost(null); // Limpa post em edição
    setMessage(`Post ${action} com sucesso!`);
  };

  // Abstração para tratamento de erro na mutação
  const handlePostMutationError = (action) => {
    setMessage(`Erro ao ${action} o post. Tente novamente.`);
  };

  // Exibição enquanto carrega ou em caso de erro
  if (isLoading) return <Spinner />;
  if (error) return <div>Erro ao carregar posts: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-600 mb-6 uppercase">
        Gerenciador de Posts
      </h1>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        {message && (
          <div
            role="alert"
            aria-live="assertive"
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
          isSubmitting={
            handleCreatePost.isLoading || handleUpdatePost.isLoading
          }
        />

        <PostList
          posts={posts}
          onEdit={setEditingPost}
          onDelete={(id) => handleDeletePost.mutate(id)}
          isDeleting={handleDeletePost.isLoading}
        />
      </div>
    </div>
  );
}

// Componente de Spinner (carregamento)
const Spinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
  </div>
);

export default App;
