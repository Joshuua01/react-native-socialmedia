export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface IPost {
  userId: number;
  id?: number;
  title: string;
  body: string;
}

export interface IComment {
  postId: number;
  id?: number;
  name: string;
  email: string;
  body: string;
}

export interface IAlbum {
  userId: number;
  id: number;
  title: string;
}

export interface IPicture {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
