import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostsService } from '../../../core/services/posts.service';
import { CreateEditPostReq, Post } from '../post.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss',
})
export class PostFormComponent {
  private postsService = inject(PostsService);
  private location = inject(Location);

  editPostData = signal<Post | null>(window.history.state.post || null);

  ngOnInit() {
    if (this.editPostData()) this.updateFormValue(this.editPostData());
  }

  postForm = this.generateForm();

  generateForm() {
    return new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      body: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(240),
      ]),
    });
  }

  updateFormValue(post: Post) {
    this.postForm.setValue({
      title: post.title,
      body: post.body,
    });
  }

  onFormSubmit() {
    this.postForm.markAllAsTouched();

    console.log(this.postForm);
    if (this.postForm.invalid) return;

    if (this.editPostData()) {
      this.postsService.updatePost(
        this.editPostData()._id,
        this.postForm.value as CreateEditPostReq,
      );
    } else {
      this.postsService.createPost(this.postForm.value as CreateEditPostReq);
    }
  }

  goBack() {
    this.location.back();
  }
}
