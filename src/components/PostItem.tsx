import { Post } from "../types";

interface PostItemProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
  isDeleting?: boolean;
}

const PostItem: React.FC<PostItemProps> = ({
  post,
  onEdit,
  onDelete,
  isDeleting,
}) => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleEdit = (post: Post) => {
    scrollToTop();
    onEdit(post);
  };

  const handleDelete = (id: number) => {
    scrollToTop();
    onDelete(id);
  };

  return (
    <div
      className={`p-4 bg-gray-50 border rounded-lg shadow-md flex flex-col justify-between ${
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
          onClick={() => handleDelete(post.id ?? 0)}
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
