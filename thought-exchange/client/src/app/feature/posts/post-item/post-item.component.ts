import { Component, input, output } from '@angular/core';
import {
  LikeDislikeOutput,
  Post,
  PostActionOutput,
  PostDetails,
} from '../post.model';
import { DatePipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [DatePipe, NgClass, RouterLink],
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.scss',
})
export class PostItemComponent {
  post = input.required<Post | PostDetails>();
  isHoverShadow = input(true);
  likeDislikeOutput = output<LikeDislikeOutput>();
  postAction = output<PostActionOutput>();

  canLikeDislike = input(true);
  canEdit = input(false);

  onLikeDislikeClick(type: 'LIKE' | 'DISLIKE') {
    this.likeDislikeOutput.emit({ type, id: this.post()._id });
  }

  onPostAction(action: 'EDIT' | 'DELETE') {
    this.postAction.emit({ action, post: this.post() as Post });
  }
}
