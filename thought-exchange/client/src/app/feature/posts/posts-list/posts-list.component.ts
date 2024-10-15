import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { LikeDislikeOutput } from '../post.model';
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
    this.postsService.getPosts();
  }

  ngOnDestroy() {
    console.log('on destroy called');
  }

  onLikeDislike(value: LikeDislikeOutput) {
    console.log('From the parent component', value);
    this.postsService.likeDislikePost(value);
  }
}
