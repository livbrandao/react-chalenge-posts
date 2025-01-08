import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const PostForm = ({ onSubmit, editingPost, setEditingPost, onPostCreated }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setBody(editingPost.body);
    } else {
      setTitle("");
      setBody("");
    }
  }, [editingPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const postData = {
        id: editingPost ? editingPost.id : uuidv4(), // ID único para novos posts
        title,
        body,
      };

      const response = await fetch(
        editingPost
          ? `https://jsonplaceholder.typicode.com/posts/${editingPost.id}`
          : "https://jsonplaceholder.typicode.com/posts",
        {
          method: editingPost ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        }
      );
      const result = await response.json();
      if (editingPost) {
        onSubmit(editingPost.id, result); // Atualizar post
      } else {
        onPostCreated(postData); // Criar novo post
      }
      setTitle("");
      setBody("");
    } catch (error) {
      console.error("Erro ao salvar post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Título</label>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Conteúdo</label>
        <textarea
          placeholder="Conteúdo"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center space-x-4">
        <button
          type="submit"
          className={`px-4 py-2 rounded-lg text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Aguarde..." : editingPost ? "Atualizar" : "Criar"}
        </button>
        {editingPost && (
          <button
            type="button"
            onClick={() => setEditingPost(null)}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default PostForm;
