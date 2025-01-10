import { useState, useEffect } from "react";
import { createPost, updatePost, deletePost } from "./services/api.js";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";

export function App() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {});

  const handleCreatePost = async (newPost) => {
    try {
      const createdPost = await createPost(newPost);
      const generateUniqueId = () => {
        let id;
        do {
          id = Math.floor(Math.random() * 101);
        } while (posts.some((post) => post.id === id));
        return id;
      };
      setPosts((prevPosts) => [
        ...prevPosts,
        { ...createdPost, id: generateUniqueId() },
      ]);
      setMessage("Post criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar post:", error);
      setMessage("Erro ao criar o post. Tente novamente.");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleUpdatePost = async (updatedPost) => {
    try {
      const postUpdated = await updatePost(updatedPost.id, updatedPost);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === updatedPost.id ? postUpdated : post
        )
      );
      setEditingPost(null);
      setMessage("Post atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar post:", error);
      setMessage("Erro ao atualizar o post. Tente novamente.");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleDeletePost = async (id) => {
    try {
      await deletePost(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      setMessage("Post escluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir post:", error);
      setMessage("Erro ao excluir o post. Tente novamente.");
    }
    setTimeout(() => setMessage(""), 3000);
  };

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
          onSubmit={editingPost ? handleUpdatePost : handleCreatePost}
          editingPost={editingPost}
          setEditingPost={setEditingPost}
        />
        <PostList
          posts={posts}
          onEdit={setEditingPost}
          onDelete={handleDeletePost}
        />
      </div>
    </div>
  );
}
