import PostItem from "./PostItem";

const PostList = ({ posts, onEdit, onDelete }) => {
  if (!posts || posts.length === 0) {
    return <p className="text-center text-gray-500">Nenhum post encontrado.</p>;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default PostList;
