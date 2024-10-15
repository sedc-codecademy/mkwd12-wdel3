import { Component, input, output } from '@angular/core';
import { LikeDislikeOutput, Post, PostDetails } from '../post.model';
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

  onLikeDislikeClick(type: 'LIKE' | 'DISLIKE') {
    this.likeDislikeOutput.emit({ type, id: this.post()._id });
  }
}
