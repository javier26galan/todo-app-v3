import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from './signup/user.model';
import { Subject } from 'rxjs';

const BACKEND_URL = environment.backend + '/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated = false;
  private token!: string;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer!: NodeJS.Timer;
  private userId!: string;

  constructor(private http: HttpClient, private router: Router) {}

  getToken(): string {
    return this.token;
  }

  getUserId(): string {
    return this.userId;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener;
  }

  postUser = (userName: string, email: string, password: string) => {
    let user: User = {
      userName: userName,
      email: email,
      password: password,
    };
    this.http.post(BACKEND_URL + '/signup', user).subscribe((response) => {
      this.router.navigate(['/login']);
    });
  };

  loginUser = (email: string, password: string) => {
    let user = {
      email: email,
      password: password,
    };
    this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        BACKEND_URL + '/login',
        user
      )
      .subscribe((response) => {
        const token = response.token;
        const userId = response.userId;
        this.token = token;
        this.userId = userId;

        if (token) {
          const expiresInDuration = response.expiresIn; //duration of token
          this.tokenTimer = setTimeout(() => {
            this.logout();
          }, expiresInDuration * 100);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
        }
        this.router.navigate(['/todos']);
      });
  };

  logout() {
    this.token = '';
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);// clear the time out if logout manually
    this.router.navigate(['/login']);
  }
}
