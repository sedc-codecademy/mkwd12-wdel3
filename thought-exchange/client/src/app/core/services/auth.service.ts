import { inject, Injectable, signal } from '@angular/core';
import { RegisterReq, User } from '../../feature/auth/auth.model';
import { Router } from '@angular/router';
import { AuthApiService } from './auth-api.service';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private apiService = inject(AuthApiService);
  private notificationsService = inject(NotificationsService);

  currentUser = signal<User | null>(this.getUserFromLocalStorage());

  loginUser(email: string, password: string) {
    this.apiService.loginUser(email, password).subscribe({
      next: (value) => {
        this.currentUser.set(value);
        this.saveUserInLocalStorage(this.currentUser());
        this.router.navigate(['posts']);
      },
      error: (err) => {
        this.notificationsService.showError(err.error.message);
      },
    });
  }

  registerUser(reqBody: RegisterReq) {
    this.apiService.registerUser(reqBody).subscribe({
      next: () => {
        console.log('user registered!');
        this.notificationsService.showSuccess('User registered successfully!');
        this.router.navigate(['login']);
      },
      error: (err) => {
        this.notificationsService.showError(err.error.message);
      },
    });
  }

  logoutFromClient() {
    this.currentUser.set(null);
    localStorage.clear();

    this.router.navigate(['']);
  }

  logoutFromServer() {
    this.apiService.logoutUserFromServer().subscribe();
  }

  saveUserInLocalStorage(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getUserFromLocalStorage(): User | null {
    const stringUserData = localStorage.getItem('currentUser');
    return stringUserData ? JSON.parse(stringUserData) : null;
  }
}
