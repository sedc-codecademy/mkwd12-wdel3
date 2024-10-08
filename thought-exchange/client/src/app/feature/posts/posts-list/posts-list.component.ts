import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { postsMock } from '../posts.mock';
import { LikeDislikeOutput, Post } from '../post.model';
import { PostItemComponent } from '../post-item/post-item.component';
import { PostsService } from '../../../core/services/posts.service';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [PostItemComponent],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss',
})
export class PostsListComponent implements OnInit, OnDestroy {
  private postsService = inject(PostsService);

  posts = this.postsService.posts;

  ngOnInit() {
    console.log('on init called');

    this.postsService.getPosts();
  }

  ngOnDestroy() {
    console.log('on destroy called');
  }

  onLikeDislike(value: LikeDislikeOutput) {
    console.log('From the parent component', value);

    if (value.type === 'LIKE') this.postsService.likePost(value.id);
    if (value.type === 'DISLIKE') this.postsService.likePost(value.id);
  }
}
