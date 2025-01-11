const API_URL = "https://jsonplaceholder.typicode.com";

export async function getPosts() {
  const response = await fetch(`${API_URL}/posts`);
  if (!response.ok) {
    throw new Error("Erro ao buscar posts");
  }
  return response.json();
}

export async function createPost(newPost) {
  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });
  if (!response.ok) {
    throw new Error("Erro ao criar post");
  }
  return response.json();
}

export async function updatePost(id, updatedPost) {
  if (id > 100) {
    return Promise.resolve(updatedPost);
  }

  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPost),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar post");
  }
  return response.json();
}

export async function deletePost(id) {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Erro ao excluir post");
  }
  return response.json();
}
