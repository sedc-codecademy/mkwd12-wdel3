import { Injectable, signal } from '@angular/core';
import { Post } from '../../feature/posts/post.model';
import { postsMock } from '../../feature/posts/posts.mock';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  posts = signal<Post[]>([]);

  getPosts() {
    setTimeout(() => {
      this.posts.set(postsMock);
    }, 1500);
  }

  likePost(postId: string) {
    console.log('This is called from the service and its like', postId);
  }

  dislikePost(postId: string) {
    console.log('This is called from the service and its dislike', postId);
  }
}
