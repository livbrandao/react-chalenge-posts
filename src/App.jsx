import { useState, useEffect } from "react";
import { createPost, updatePost, deletePost } from "./services/api.js";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";

export function App() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      }
    };

    fetchPosts();
  }, []);

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
    } catch (error) {
      console.error("Erro ao criar post:", error);
    }
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
    } catch (error) {
      console.error("Erro ao atualizar post:", error);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await deletePost(id);
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
