import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'todos',
    loadChildren: () =>
      import('./layout/todos/todos.module').then((m) => m.TodosModule),
    canActivate: [authGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'pixela',
    loadChildren: () =>
      import('./layout/pixela/pixela.module').then((m) => m.PixelaModule),
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
