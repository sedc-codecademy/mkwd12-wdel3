import { Component, input } from '@angular/core';
import { PostComment } from '../post.model';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-comments-list',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './comments-list.component.html',
  styleUrl: './comments-list.component.scss',
})
export class CommentsListComponent {
  comments = input<PostComment[]>([]);
  showPostLink = input(false);
}
