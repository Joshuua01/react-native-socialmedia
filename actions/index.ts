import { IPost, IUser, IComment } from "@/models";

const api_url = "https://jsonplaceholder.typicode.com";

export const getUsers = async () => {
  const response = await fetch(`${api_url}/users`);
  const data = await response.json();
  return data as IUser[];
};

export const getPosts = async () => {
  const response = await fetch(`${api_url}/posts`);
  const data = await response.json();
  return data as IPost[];
};

export const getCommentsByPostId = async (postId: number) => {
  const response = await fetch(`${api_url}/posts/${postId}/comments`);
  const data = await response.json();
  return data as IComment[];
};
