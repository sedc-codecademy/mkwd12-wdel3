import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

export const authGuard = () => {
  const currentUser = inject(AuthService).currentUser;
  const router = inject(Router);

  if (!currentUser()) {
    router.navigate(['login']);
    return false;
  }

  return true;
};

export const loginGuard = () => {
  const currentUser = inject(AuthService).currentUser;
  const router = inject(Router);

  if (currentUser()) {
    router.navigate(['posts']);
    return false;
  }

  return true;
};
