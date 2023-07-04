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
      .post<{
        token: string;
        expiresIn: number;
        userId: string;
        userName: string;
        todosDone:number;
      }>(BACKEND_URL + '/login', user)
      .subscribe((response) => {
        const token = response.token;
        const userId = response.userId;
        const userName = response.userName;
        const todosDone = response.todosDone.toString();
        this.token = token;
        this.userId = userId;
        if (token) {
          const expiresInDuration = response.expiresIn; //duration of token
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 100
          );
          this.saveAuthData(token, expirationDate, userId, userName, todosDone);
          this.router.navigate(['/todos']);
        }
      });
  };

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    // check if the token still valid
    const now = new Date();
    const expiresIn = authInformation!.expirationDate.getTime() - now.getTime();
    console.log(expiresIn);
    if (expiresIn > 0) {
      this.token = authInformation!.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn/100);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = '';
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer); // clear the time out if logout manually
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 100);
  }

  private saveAuthData(
    token: string,
    expirationDate: Date,
    userId: string,
    userName: string,
    todosDone: string
  ) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('userName', userName);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('todosDone', todosDone)
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('expiration');
    localStorage.removeItem('todosDone');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const expirationDate = localStorage.getItem('expiration');
    const todosDone = localStorage.getItem('expiration');
    if (!token || !expirationDate || !userId || !userName || !todosDone) {
      return;
    } else {
      return {
        token: token,
        userId: userId,
        userName: userName,
        expirationDate: new Date(expirationDate),
        todosDone: todosDone
      };
    }
  }
}
