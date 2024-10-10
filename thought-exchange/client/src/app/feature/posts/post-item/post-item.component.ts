import { Component, input, output } from '@angular/core';
import { LikeDislikeOutput, Post } from '../post.model';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [DatePipe, NgClass],
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.scss',
})
export class PostItemComponent {
  post = input.required<Post>();
  isHoverShadow = input(true);
  likeDislikeOutput = output<LikeDislikeOutput>();

  onLikeDislikeClick(type: 'LIKE' | 'DISLIKE') {
    this.likeDislikeOutput.emit({ type, id: this.post()._id });
  }
}
