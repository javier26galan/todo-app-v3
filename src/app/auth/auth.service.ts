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
  private isAuthenticated = false;
  private token!: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken(): string {
    return this.token;
  }

  getAuthStatusListenner(){
    return this.authStatusListener;
  }

  postUser = (userName: string, email: string, password: string) => {
    let user: User = {
      userName: userName,
      email: email,
      password: password,
    };
    this.http.post(BACKEND_URL + '/signup', user).subscribe((response) => {
      console.log('sigupService response', response);
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
        this.token = token;
        console.log(response);
        this.isAuthenticated = true;
        this.authStatusListener.next(true)
        this.router.navigate(['/']);
      });
  };
}