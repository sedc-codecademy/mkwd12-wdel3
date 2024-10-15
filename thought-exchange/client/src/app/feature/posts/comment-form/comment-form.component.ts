import { Component, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.scss',
})
export class CommentFormComponent {
  submitOutput = output<string>();

  commentForm = new FormGroup({
    body: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(140),
    ]),
  });

  onFormSubmit() {
    if (this.commentForm.invalid) return;

    this.submitOutput.emit(this.commentForm.value.body);

    this.commentForm.reset();
  }
}
