import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../core.constants';
import {
  CreateCommentReq,
  CreateEditPostReq,
  LikeDislikeOutput,
  Post,
  PostComment,
  PostDetails,
} from '../../feature/posts/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsApiService {
  private http = inject(HttpClient);

  fetchAllPosts() {
    return this.http.get<Post[]>(`${API_URL}/posts`);
  }

  fetchPostById(postId: string) {
    return this.http.get<PostDetails>(`${API_URL}/posts/${postId}`);
  }

  createPost(reqBody: CreateEditPostReq) {
    return this.http.post<Post>(`${API_URL}/posts`, reqBody);
  }

  updatePost(postId: string, reqBody: CreateEditPostReq) {
    return this.http.patch(`${API_URL}/posts/${postId}`, reqBody);
  }

  fetchPostsByUser() {
    return this.http.get<Post[]>(`${API_URL}/posts/user`);
  }

  fetchCommentsByUser() {
    return this.http.get<PostComment[]>(`${API_URL}/comments/user`);
  }

  postComment(reqBody: CreateCommentReq) {
    return this.http.post(`${API_URL}/comments`, reqBody);
  }

  likeDislikePost(data: LikeDislikeOutput) {
    return this.http.patch<{ likes: number } | { dislikes: number }>(
      `${API_URL}/posts/${data.id}/${data.type.toLowerCase()}`,
      null,
    );
  }
}
