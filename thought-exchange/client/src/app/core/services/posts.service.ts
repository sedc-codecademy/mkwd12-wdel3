import { inject, Injectable, signal } from '@angular/core';
import {
  CreateCommentReq,
  LikeDislikeOutput,
  Post,
  PostDetails,
} from '../../feature/posts/post.model';
import { PostsApiService } from './posts-api.service';
import { NotificationsService } from './notifications.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private apiService = inject(PostsApiService);
  private notificationsService = inject(NotificationsService);
  private router = inject(Router);

  posts = signal<Post[]>([]);
  postDetails = signal<PostDetails>(null);

  getPosts() {
    this.apiService.fetchAllPosts().subscribe({
      next: (value) => {
        this.posts.set(value);
      },
      error: (err) => {
        console.log(err);
        this.notificationsService.showError(err.error.message);
      },
    });
  }

  getPostById(postId: string) {
    this.apiService.fetchPostById(postId).subscribe({
      next: (value) => {
        this.postDetails.set(value);
      },
      error: (err) => {
        console.log(err);
        this.router.navigate(['not-found']);
        this.notificationsService.showError(err.error.message);
      },
    });
  }

  createComment(reqBody: CreateCommentReq) {
    this.apiService.postComment(reqBody).subscribe({
      next: () => {
        this.notificationsService.showSuccess('Comment added!');
        this.getPostById(reqBody.postId);
      },
      error: (err) => {
        console.log(err);
        this.notificationsService.showError(err.error.message);
      },
    });
  }

  likeDislikePost(data: LikeDislikeOutput) {
    this.apiService.likeDislikePost(data).subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (err) => {
        console.log(err);
        this.notificationsService.showError(err.error.message);
      },
    });
  }
}
