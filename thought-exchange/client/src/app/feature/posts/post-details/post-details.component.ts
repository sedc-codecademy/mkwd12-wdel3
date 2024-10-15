import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../../../core/services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { PostItemComponent } from '../post-item/post-item.component';
import { CommentsListComponent } from '../comments-list/comments-list.component';
import { CommentFormComponent } from '../comment-form/comment-form.component';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [PostItemComponent, CommentsListComponent, CommentFormComponent],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss',
})
export class PostDetailsComponent implements OnInit {
  private postsService = inject(PostsService);
  private route = inject(ActivatedRoute);

  postDetails = this.postsService.postDetails;

  ngOnInit() {
    const postId = this.route.snapshot.params.id;

    this.postsService.getPostById(postId);
  }

  onCommentSubmit(body: string) {
    console.log('This is in the parent', body);
    //Call the create comment endpoint to create a comment
    this.postsService.createComment({ postId: this.postDetails()._id, body });
  }
}
