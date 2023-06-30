import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from './user.model';

const BACKEND_URL = environment.backend + '/user/signup';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private http: HttpClient, private router: Router) {}

  postUser = (userName: string, email: string, password: string) => {
    let user:User = {
      userName: userName,
      email: email,
      password: password
    }
    console.log('service user post', user);
    console.log("url", BACKEND_URL);

    this.http.post(BACKEND_URL, user).subscribe((response) => {
      console.log('sigupService response', response);
      this.router.navigate(["/login"])
    });
  };
}
