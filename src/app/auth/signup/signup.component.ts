import { Component } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(public authService: AuthService) {}

  formSignup!: FormGroup;
  ngOnInit(): void {
    this.formSignup = new FormGroup({
      userName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onSignup() {
    if (this.formSignup.invalid) {
      return;
    } else {
      this.authService.postUser(
        this.formSignup.value.userName,
        this.formSignup.value.email,
        this.formSignup.value.password
      );
    }
  }
}
