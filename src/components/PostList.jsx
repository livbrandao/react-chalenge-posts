import PostItem from "./PostItem";

const PostList = ({ posts, onEdit, onDelete }) => {
  if (!posts.length) {
    return <p className="text-center text-gray-500">Nenhum post encontrado.</p>;
  }

  return (
    <div className="space-y-4">
      {posts.map((post, index) => (
        <PostItem
          key={post.id || `fallback-${index}`}
          post={post}
          onEdit={() => onEdit(post)}
          onDelete={() => onDelete(post.id)}
        />
      ))}
    </div>
  );
};

export default PostList;
