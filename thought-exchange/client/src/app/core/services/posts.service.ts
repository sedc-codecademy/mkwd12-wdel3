import { inject, Injectable, signal } from '@angular/core';
import {
  CreateCommentReq,
  CreateEditPostReq,
  LikeDislikeOutput,
  Post,
  PostComment,
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
  userComments = signal<PostComment[]>([]);

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

  getPostsByUser() {
    this.apiService.fetchPostsByUser().subscribe({
      next: (value) => {
        this.posts.set(value);
      },
      error: (err) => {
        console.log(err);
        this.notificationsService.showError(err.error.message);
      },
    });
  }

  getCommentsByUser() {
    this.apiService.fetchCommentsByUser().subscribe({
      next: (comments) => {
        console.log(comments);
        this.userComments.set(comments);
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

  createPost(reqBody: CreateEditPostReq) {
    this.apiService.createPost(reqBody).subscribe({
      next: (post) => {
        this.notificationsService.showSuccess('Post created successfully!');
        this.router.navigate(['posts', post._id]);
      },
      error: (err) => {
        console.log(err);
        this.notificationsService.showError(err.error.message);
      },
    });
  }

  updatePost(postId: string, reqBody: CreateEditPostReq) {
    this.apiService.updatePost(postId, reqBody).subscribe({
      next: () => {
        this.notificationsService.showSuccess('Post updated successfully!');
        this.router.navigate(['posts', postId]);
      },
      error: (err) => {
        console.log(err);
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
        if (this.postDetails()) {
          this.postDetails.update((details) => {
            if (data.type === 'LIKE') {
              const likesData = value as { likes: number };
              return { ...details, likes: likesData.likes };
            }
            if (data.type === 'DISLIKE') {
              const dislikesData = value as { dislikes: number };
              return { ...details, dislikes: dislikesData.dislikes };
            }

            return details;
          });
        } else {
          this.posts.update((prevPosts) =>
            prevPosts.map((post) => {
              if (post._id === data.id) {
                if (data.type === 'LIKE') {
                  const likesData = value as { likes: number };
                  return { ...post, likes: likesData.likes };
                }
                if (data.type === 'DISLIKE') {
                  const dislikesData = value as { dislikes: number };
                  return { ...post, dislikes: dislikesData.dislikes };
                }
              }

              return post;
            }),
          );
        }
      },
      error: (err) => {
        console.log(err);
        this.notificationsService.showError(err.error.message);
      },
    });
  }
}
