const PostItem = ({ post, onEdit, onDelete }) => {
  const handleEdit = (post) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    onEdit(post);
  };

  return (
    <div className="p-4 bg-gray-50 border rounded-lg shadow-sm">
      <h2 className="text-xl font-bold text-gray-800">{post.title}</h2>
      <p className="text-gray-600 text-sm sm:text-base md:text-lg">
        {post.body}
      </p>
      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => handleEdit(post)}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 text-sm sm:text-base md:text-lg"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(post.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 text-sm sm:text-base md:text-lg"
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default PostItem;
