import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './layout/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./layout/todos/todos.module').then((m) => m.TodosModule),
  },
  {
    path: 'signup', component: SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
