import { IPost, IUser, IComment, IAlbum, IPicture } from "@/models";

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
