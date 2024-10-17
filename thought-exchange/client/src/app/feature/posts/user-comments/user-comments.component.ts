import { Component, inject } from '@angular/core';
import { CommentsListComponent } from '../comments-list/comments-list.component';
import { AuthService } from '../../../core/services/auth.service';
import { PostsService } from '../../../core/services/posts.service';

@Component({
  selector: 'app-user-comments',
  standalone: true,
  imports: [CommentsListComponent],
  templateUrl: './user-comments.component.html',
  styleUrl: './user-comments.component.scss',
})
export class UserCommentsComponent {
  private postsService = inject(PostsService);

  currentUser = inject(AuthService).currentUser;
  userComments = this.postsService.userComments;

  ngOnInit() {
    this.postsService.getCommentsByUser();
  }
}
