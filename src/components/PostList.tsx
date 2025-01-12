import { useState } from "react";
import PostItem from "./PostItem";
import SearchFilter from "./SearchFilter";
import { Post } from "../types";

interface PostListProps {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
  isDeleting: boolean;
}

const PostList: React.FC<PostListProps> = ({
  posts,
  onEdit,
  onDelete,
  isDeleting,
}) => {
  const postsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  if (!posts || posts.length === 0) {
    return <p className="text-center text-gray-500">Nenhum post encontrado.</p>;
  }

  // Filtra posts pelo título
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="mt-10">
      <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {filteredPosts.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">
          Nenhum post encontrado com esse título.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentPosts.map((post) => (
              <PostItem
                key={post.id ?? 0}
                post={post}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>

          <div className="flex justify-center mt-10">
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

          {/* Indicador de exclusão em andamento */}
          {isDeleting && (
            <div className="flex justify-center mt-4 text-gray-500">
              Excluindo... Por favor, aguarde.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostList;
