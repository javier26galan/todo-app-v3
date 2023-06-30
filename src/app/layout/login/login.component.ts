import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(public loginService: LoginService) {}

  formLogin!: FormGroup;
  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onLogin() {
    if (this.formLogin.invalid) {
      return
    }else{
      const {email, password} = this.formLogin.value;
      this.loginService.loginUser(email, password)
    }
  }
}
