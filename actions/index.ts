import { IAlbum, IComment, IPicture, IPost, ITodo, IUser } from "@/models";

const api_url = "https://jsonplaceholder.typicode.com";

// User

export const getUsers = () => {
  return fetch(`${api_url}/users`)
    .then((response) => response.json())
    .then((data) => data as IUser[])
    .catch((error) => {
      console.log("Failed to get users", error);
      throw error;
    });
};

export const getUserById = (userId: number) => {
  return fetch(`${api_url}/users/${userId}`)
    .then((response) => response.json())
    .then((data) => data as IUser)
    .catch((error) => {
      console.log("Failed to get user by ID", error);
      throw error;
    });
};

// Post

export const getPosts = () => {
  return fetch(`${api_url}/posts`)
    .then((response) => response.json())
    .then((data) => data as IPost[])
    .catch((error) => {
      console.log("Failed to get posts", error);
      throw error;
    });
};

export const getPostById = (postId: number) => {
  return fetch(`${api_url}/posts/${postId}`)
    .then((response) => response.json())
    .then((data) => data as IPost)
    .catch((error) => {
      console.log("Failed to get post by ID", error);
      throw error;
    });
};

export const createPost = (post: IPost) => {
  return fetch(`${api_url}/posts`, {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (!response.ok) {
        console.log("Failed to create post");
        throw new Error("Failed to create post");
      }
      return response.json();
    })
    .then((data) => data as IPost)
    .catch((error) => {
      console.log("Failed to create post", error);
      throw error;
    });
};

export const deletePost = (postId: number) => {
  return fetch(`${api_url}/posts/${postId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        console.log("Failed to delete post");
        throw new Error("Failed to delete post");
      }
      return response.ok;
    })
    .catch((error) => {
      console.log("Failed to delete post", error);
      throw error;
    });
};

export const editPost = (post: IPost) => {
  return fetch(`${api_url}/posts/${post.id}`, {
    method: "PUT",
    body: JSON.stringify(post),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (!response.ok) {
        console.log("Failed to edit post");
        throw new Error("Failed to edit post");
      }
      return response.json();
    })
    .then((data) => data as IPost)
    .catch((error) => {
      console.log("Failed to edit post", error);
      throw error;
    });
};

// Comment

export const getCommentsByPostId = (postId: number) => {
  return fetch(`${api_url}/posts/${postId}/comments`)
    .then((response) => response.json())
    .then((data) => data as IComment[])
    .catch((error) => {
      console.log("Failed to get comments by post ID", error);
      throw error;
    });
};

export const getCommentById = (commentId: number) => {
  return fetch(`${api_url}/comments/${commentId}`)
    .then((response) => response.json())
    .then((data) => data as IComment)
    .catch((error) => {
      console.log("Failed to get comment by ID", error);
      throw error;
    });
};

export const createComment = (comment: IComment) => {
  return fetch(`${api_url}/comments`, {
    method: "POST",
    body: JSON.stringify(comment),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => data as IComment)
    .catch((error) => {
      console.log("Failed to create comment", error);
      throw error;
    });
};

export const deleteComment = (commentId: number) => {
  return fetch(`${api_url}/comments/${commentId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        console.log("Failed to delete comment");
        throw new Error("Failed to delete comment");
      }
      return response.ok;
    })
    .catch((error) => {
      console.log("Failed to delete comment", error);
      throw error;
    });
};

export const editComment = (comment: IComment) => {
  return fetch(`${api_url}/comments/${comment.id}`, {
    method: "PUT",
    body: JSON.stringify(comment),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (!response.ok) {
        console.log("Failed to edit comment");
        throw new Error("Failed to edit comment");
      }
      return response.json();
    })
    .then((data) => data as IComment)
    .catch((error) => {
      console.log("Failed to edit comment", error);
      throw error;
    });
};

// Album

export const getAlbums = () => {
  return fetch(`${api_url}/albums`)
    .then((response) => response.json())
    .then((data) => data as IAlbum[])
    .catch((error) => {
      console.log("Failed to get albums", error);
      throw error;
    });
};

export const getAlbumById = (albumId: number) => {
  return fetch(`${api_url}/albums/${albumId}`)
    .then((response) => response.json())
    .then((data) => data as IAlbum)
    .catch((error) => {
      console.log("Failed to get album by ID", error);
      throw error;
    });
};

export const createAlbum = (album: IAlbum) => {
  return fetch(`${api_url}/albums`, {
    method: "POST",
    body: JSON.stringify(album),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => data as IAlbum)
    .catch((error) => {
      console.log("Failed to create album", error);
      throw error;
    });
};

export const deleteAlbum = (albumId: number) => {
  return fetch(`${api_url}/albums/${albumId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        console.log("Failed to delete album");
        throw new Error("Failed to delete album");
      }
      return response.ok;
    })
    .catch((error) => {
      console.log("Failed to delete album", error);
      throw error;
    });
};

export const editAlbum = (album: IAlbum) => {
  return fetch(`${api_url}/albums/${album.id}`, {
    method: "PUT",
    body: JSON.stringify(album),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (!response.ok) {
        console.log("Failed to edit album");
        throw new Error("Failed to edit album");
      }
      return response.json();
    })
    .then((data) => data as IAlbum)
    .catch((error) => {
      console.log("Failed to edit album", error);
      throw error;
    });
};

// Picture

export const getPicturesByAlbumId = (albumId: number) => {
  return fetch(`${api_url}/albums/${albumId}/photos`)
    .then((response) => response.json())
    .then((data) => data as IPicture[])
    .catch((error) => {
      console.log("Failed to get pictures by album ID", error);
      throw error;
    });
};

export const addPictureToAlbum = (picture: IPicture) => {
  return fetch(`${api_url}/photos`, {
    method: "POST",
    body: JSON.stringify(picture),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => data as IPicture)
    .catch((error) => {
      console.log("Failed to add picture to album", error);
      throw error;
    });
};

export const deletePicture = (pictureId: number) => {
  return fetch(`${api_url}/photos/${pictureId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        console.log("Failed to delete picture");
        throw new Error("Failed to delete picture");
      }
      return response.ok;
    })
    .catch((error) => {
      console.log("Failed to delete picture", error);
      throw error;
    });
};

// Todo

export const getTodosByUserId = (userId: number) => {
  return fetch(`${api_url}/users/${userId}/todos`)
    .then((response) => response.json())
    .then((data) => data as ITodo[])
    .catch((error) => {
      console.log("Failed to get todos by user ID", error);
      throw error;
    });
};

export const getTodoById = (todoId: number) => {
  return fetch(`${api_url}/todos/${todoId}`)
    .then((response) => response.json())
    .then((data) => data as ITodo)
    .catch((error) => {
      console.log("Failed to get todo by ID", error);
      throw error;
    });
};

export const createTodo = (todo: ITodo) => {
  return fetch(`${api_url}/todos`, {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => data as ITodo)
    .catch((error) => {
      console.log("Failed to create todo", error);
      throw error;
    });
};

export const editTodo = (todo: ITodo) => {
  return fetch(`${api_url}/todos/${todo.id}`, {
    method: "PUT",
    body: JSON.stringify(todo),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (!response.ok) {
        console.log("Failed to edit todo");
        throw new Error("Failed to edit todo");
      }
      return response.json();
    })
    .then((data) => data as ITodo)
    .catch((error) => {
      console.log("Failed to edit todo", error);
      throw error;
    });
};

export const deleteTodo = (todoId: number) => {
  return fetch(`${api_url}/todos/${todoId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        console.log("Failed to delete todo");
        throw new Error("Failed to delete todo");
      }
      return response.ok;
    })
    .catch((error) => {
      console.log("Failed to delete todo", error);
      throw error;
    });
};
