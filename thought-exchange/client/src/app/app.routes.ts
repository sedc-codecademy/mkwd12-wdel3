import { Routes } from '@angular/router';
import { HomeComponent } from './feature/home/home.component';
import { LoginComponent } from './feature/auth/login/login.component';
import { RegisterComponent } from './feature/auth/register/register.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { PostsListComponent } from './feature/posts/posts-list/posts-list.component';
import { authGuard, loginGuard } from './core/guards';
import { PostDetailsComponent } from './feature/posts/post-details/post-details.component';
import { PostFormComponent } from './feature/posts/post-form/post-form.component';
import { UserCommentsComponent } from './feature/posts/user-comments/user-comments.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [() => loginGuard()],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [() => loginGuard()],
  },
  {
    path: 'posts',
    component: PostsListComponent,
    canActivate: [() => authGuard()],
  },
  {
    path: 'user/posts',
    component: PostsListComponent,
    canActivate: [() => authGuard()],
  },
  {
    path: 'user/comments',
    component: UserCommentsComponent,
    canActivate: [() => authGuard()],
  },
  {
    path: 'posts/create',
    component: PostFormComponent,
    canActivate: [() => authGuard()],
  },
  {
    path: 'posts/edit',
    component: PostFormComponent,
    canActivate: [() => authGuard()],
  },
  {
    path: 'posts/:id',
    component: PostDetailsComponent,
    canActivate: [() => authGuard()],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
