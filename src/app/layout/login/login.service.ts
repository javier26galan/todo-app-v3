import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.backend + '/user/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private isAuthenticated = false;
  private token!: string;

  constructor(private http: HttpClient, private router: Router) {}

  loginUser = (email: string, password: string) => {
    let user = {
      email: email,
      password: password,
    };
    this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        BACKEND_URL,
        user
      )
      .subscribe((response) => {
        const token = response.token;
        this.token = token;
        this.isAuthenticated = true;
        this.router.navigate(['/']);
      });
  };
}
