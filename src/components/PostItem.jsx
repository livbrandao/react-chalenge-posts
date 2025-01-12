import React, { useState } from "react";

const PostItem = ({ post, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleEdit = (post) => {
    onEdit(post);
    scrollToTop();
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(post.id);
    setIsDeleting(false);
  };

  return (
    <div
      className={`p-4 bg-gray-50 border rounded-lg shadow-sm ${
        isDeleting ? "bg-gray-200" : ""
      }`}
    >
      <div>
        <h2 className="text-xl font-bold text-gray-800 break-normal">
          {post.title}
        </h2>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg break-normal">
          {post.body}
        </p>
      </div>
      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => handleEdit(post)}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 text-sm sm:text-base md:text-lg"
        >
          Editar
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 text-sm sm:text-base md:text-lg"
        >
          {isDeleting ? <span className="animate-spin"></span> : "Excluir"}
        </button>
      </div>
    </div>
  );
};

export default PostItem;
