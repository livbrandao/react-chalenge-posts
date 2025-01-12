import { useState } from "react";
import PostItem from "./PostItem";

const PostList = ({ posts, onEdit, onDelete }) => {
  const postsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  if (!posts || posts.length === 0) {
    return <p className="text-center text-gray-500">Nenhum post encontrado.</p>;
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentPosts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
        >
          Anterior
        </button>
        <span className="mx-4 text-lg text-gray-600">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default PostList;
