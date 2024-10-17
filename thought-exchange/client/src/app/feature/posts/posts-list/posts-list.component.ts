import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { LikeDislikeOutput, PostActionOutput } from '../post.model';
import { PostItemComponent } from '../post-item/post-item.component';
import { PostsService } from '../../../core/services/posts.service';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [PostItemComponent],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss',
})
export class PostsListComponent implements OnInit, OnDestroy {
  private postsService = inject(PostsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  currentUser = inject(AuthService).currentUser;

  posts = this.postsService.posts;

  isUserPosts = signal(false);

  ngOnInit() {
    this.isUserPosts.set(this.route.snapshot.routeConfig.path === 'user/posts');

    if (this.isUserPosts()) {
      this.postsService.getPostsByUser();
    } else {
      this.postsService.getPosts();
    }
  }

  ngOnDestroy() {
    console.log('on destroy called');
  }

  onLikeDislike(value: LikeDislikeOutput) {
    this.postsService.likeDislikePost(value);
  }

  onPostAction(value: PostActionOutput) {
    console.log(value);

    if (value.action === 'EDIT') {
      this.router.navigate(['posts', 'edit'], {
        state: {
          post: value.post,
        },
      });
    }
  }
}
