import { IPost, IUser, IComment, IAlbum, IPicture } from "@/models";

const api_url = "https://jsonplaceholder.typicode.com";

//User

export const getUsers = async () => {
  const response = await fetch(`${api_url}/users`);
  const data = await response.json();
  return data as IUser[];
};

export const getUserById = async (userId: number) => {
  const response = await fetch(`${api_url}/users/${userId}`);
  const data = await response.json();
  return data as IUser;
};

//Post

export const getPosts = async () => {
  const response = await fetch(`${api_url}/posts`);
  const data = await response.json();
  return data as IPost[];
};

export const getPostById = async (postId: number) => {
  const response = await fetch(`${api_url}/posts/${postId}`);
  const data = await response.json();
  return data as IPost;
};

export const createPost = async (post: IPost) => {
  const response = await fetch(`${api_url}/posts`, {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await response.json();
  return data as IPost;
};

//Comment

export const getCommentsByPostId = async (postId: number) => {
  const response = await fetch(`${api_url}/posts/${postId}/comments`);
  const data = await response.json();
  return data as IComment[];
};

export const createComment = async (comment: IComment) => {
  const response = await fetch(`${api_url}/comments`, {
    method: "POST",
    body: JSON.stringify(comment),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await response.json();
  return data as IComment;
};

//Album

export const getAlbums = async () => {
  const response = await fetch(`${api_url}/albums`);
  const data = await response.json();
  return data as IAlbum[];
};

export const getAlbumById = async (albumId: number) => {
  const response = await fetch(`${api_url}/albums/${albumId}`);
  const data = await response.json();
  return data as IAlbum;
};

//Picture

export const getPicturesByAlbumId = async (albumId: number) => {
  const response = await fetch(`${api_url}/albums/${albumId}/photos`);
  const data = await response.json();
  return data as IPicture[];
};
