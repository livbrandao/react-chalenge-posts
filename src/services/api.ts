import { Post } from "../types";

const API_URL = "https://jsonplaceholder.typicode.com";

export async function getPosts(): Promise<Post[]> {
  const response = await fetch(`${API_URL}/posts`);
  if (!response.ok) {
    throw new Error("Erro ao buscar posts");
  }
  return response.json();
}

export async function createPost(newPost: Post): Promise<Post> {
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

export async function updatePost(id: number, updatedPost: Post): Promise<Post> {
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

export async function deletePost(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Erro ao excluir post");
  }
  return;
}
