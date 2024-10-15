import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../core.constants';
import { RegisterReq, User } from '../../feature/auth/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private http = inject(HttpClient);

  loginUser(email: string, password: string) {
    return this.http.post<User>(`${API_URL}/auth/login`, { email, password });
  }

  registerUser(reqBody: RegisterReq) {
    return this.http.post(`${API_URL}/auth/register`, reqBody);
  }

  logoutUserFromServer() {
    return this.http.get(`${API_URL}/auth/logout`);
  }
}
