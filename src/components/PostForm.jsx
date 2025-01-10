import { useState, useEffect } from "react";

const PostForm = ({ onSubmit, editingPost, setEditingPost }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setBody(editingPost.body);
    } else {
      setTitle("");
      setBody("");
    }
    setErrors({});
  }, [editingPost]);

  const validate = () => {
    const validationErrors = {};
    if (!title.trim()) validationErrors.title = "Preenchimento obrigatório.";
    if (!body.trim()) validationErrors.body = "Preenchimento obrigatório.";
    if (title.length > 100) validationErrors.title = "Máximo 100 caracteres.";
    if (body.length > 500) validationErrors.body = "Máximo 500 caracteres.";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await onSubmit({ id: editingPost?.id, title, body });

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
        <label className="block text-gray-700 font-bold mb-2 text-sm sm:text-base md:text-lg">
          Título
        </label>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2 text-sm sm:text-base md:text-lg">
          Conteúdo
        </label>
        <textarea
          placeholder="Conteúdo"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.body && (
          <p className="text-red-500 text-sm mt-1">{errors.body}</p>
        )}
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <button
          type="submit"
          className={`w-full md:w-auto px-4 py-2 rounded-lg text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
          ) : editingPost ? (
            "Atualizar"
          ) : (
            "Criar"
          )}
        </button>
        {editingPost && (
          <button
            type="button"
            onClick={() => setEditingPost(null)}
            className="w-full sm:w-auto bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default PostForm;
