import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPosts, createPost, updatePost, deletePost } from "./services/api";
import PostList from "./components/PostList";
import { Post } from "./types";
import PostForm from "./components/PostForm";

export function App() {
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [message, setMessage] = useState<string>("");
  const queryClient = useQueryClient();

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const handleCreatePost = useMutation<Post, Error, Post>({
    mutationFn: createPost,
    onSuccess: (createdPost) =>
      handlePostMutationSuccess(createdPost, "criado"),
    onError: (error: Error) => handlePostMutationError("criar", error),
    onSettled: () => setTimeout(() => setMessage(""), 8000),
  });

  const handleUpdatePost = useMutation<Post, Error, Post>({
    mutationFn: (updatedPost: Post) =>
      (updatedPost.id ?? 0) <= 100
        ? Promise.resolve(updatedPost)
        : updatePost(updatedPost.id ?? 0, updatedPost),
    onSuccess: (updatedPost) =>
      handlePostMutationSuccess(updatedPost, "atualizado"),
    onError: (error: Error) => handlePostMutationError("atualizar", error),
    onSettled: () => setTimeout(() => setMessage(""), 8000),
  });

  const handleDeletePost = useMutation<void, Error, number>({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: (_, id: number) => {
      queryClient.setQueryData<Post[]>(["posts"], (oldPosts = []) =>
        oldPosts.filter((post) => post.id !== id)
      );
      setMessage("Post excluído com sucesso!");
    },
    onError: (error: Error) =>
      setMessage(`Erro ao excluir o post: ${error.message}`),
    onSettled: () => setTimeout(() => setMessage(""), 8000),
  });

  const isMutating =
    handleCreatePost.status === "pending" ||
    handleUpdatePost.status === "pending" ||
    handleDeletePost.status === "pending";

  const handlePostMutationSuccess = (post: Post, action: string) => {
    queryClient.setQueryData<Post[]>(["posts"], (oldPosts = []) =>
      action === "criado"
        ? [post, ...oldPosts]
        : oldPosts.map((existingPost) =>
            existingPost.id === post.id ? post : existingPost
          )
    );
    setEditingPost(null);
    setMessage(`Post ${action} com sucesso!`);
  };

  const handlePostMutationError = (action: string, error: Error) => {
    setMessage(`Erro ao ${action} o post. ${error.message}`);
  };

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
              ? (updatedPost: Post) => handleUpdatePost.mutate(updatedPost)
              : (newPost: Post) => handleCreatePost.mutate(newPost)
          }
          editingPost={editingPost}
          setEditingPost={setEditingPost}
          isSubmitting={isMutating}
        />

        <PostList
          posts={posts || []}
          onEdit={setEditingPost}
          onDelete={(id: number) => handleDeletePost.mutate(id)}
          isDeleting={handleDeletePost.status === "pending"}
        />
      </div>
    </div>
  );
}

const Spinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
  </div>
);

export default App;
