export interface Post {
  comments: string[];
  _id: string;
  title: string;
  body: string;
  likes: number;
  dislikes: number;
  author: {
    _id: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PostDetails {
  _id: string;
  title: string;
  body: string;
  likes: number;
  dislikes: number;
  author: {
    _id: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
  comments: PostComment[];
}

export interface PostComment {
  _id: string;
  body: string;
  author: {
    _id: string;
    username: string;
  };
  post: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface LikeDislikeOutput {
  type: 'LIKE' | 'DISLIKE';
  id: string;
}

export interface CreateCommentReq {
  postId: string;
  body: string;
}

export interface CreateEditPostReq {
  title: string;
  body: string;
}

export interface PostActionOutput {
  action: 'EDIT' | 'DELETE';
  post: Post;
}
