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

export interface LikeDislikeOutput {
  type: 'LIKE' | 'DISLIKE';
  id: string;
}
