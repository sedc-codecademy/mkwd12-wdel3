import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../feature/auth/auth.model';
import { userMock } from '../../feature/auth/auth.mock';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);

  currentUser = signal<User | null>(this.getUserFromLocalStorage());

  loginUser(email: string, password: string) {
    //Mock logging in the user
    this.currentUser.set(userMock);

    this.saveUserInLocalStorage(this.currentUser());
    this.router.navigate(['posts']);

    console.log(this.currentUser());
  }

  logoutFromClient() {
    this.currentUser.set(null);
    localStorage.clear();

    this.router.navigate(['']);
  }

  saveUserInLocalStorage(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getUserFromLocalStorage(): User | null {
    const stringUserData = localStorage.getItem('currentUser');

    return stringUserData ? JSON.parse(stringUserData) : null;
  }
}
