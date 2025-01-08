const PostItem = ({ post, onEdit, onDelete }) => {
  const handleDelete = async () => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
        method: "DELETE",
      });
      onDelete(post.id);
    } catch (error) {
      console.error("Erro ao excluir post:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-50 border rounded-lg shadow-sm">
      <h2 className="text-xl font-bold text-gray-800">{post.title}</h2>
      <p className="text-gray-600">{post.body}</p>
      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => onEdit(post)}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
        >
          Editar
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default PostItem;
