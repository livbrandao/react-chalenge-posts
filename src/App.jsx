import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";

export function App() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    // @todo: Implementar a função para buscar os posts da API
  }, []);

  const handleCreatePost = (newPost) => {
    const postWithUniqueId = { ...newPost, id: uuidv4() }; // Garantindo ID único
    setPosts((prevPosts) => [...prevPosts, postWithUniqueId]);
  };

  const handleUpdatePost = async (id, data) => {
    // @todo: Implementar a função para atualizar um post existente
  };

  const handleDeletePost = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "DELETE",
      });
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Erro ao excluir post:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Gerenciador de Posts
      </h1>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <PostForm
          onSubmit={editingPost ? handleUpdatePost : handleCreatePost}
          editingPost={editingPost}
          setEditingPost={setEditingPost}
          onPostCreated={handleCreatePost}
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
