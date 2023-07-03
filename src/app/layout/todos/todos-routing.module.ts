import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './todos.component';
import { TodoComponent } from './components/todo/todo.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { authGuard } from 'src/app/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TodoComponent,
    canActivate: [authGuard]
  },
  {
    path: 'create',
    component: TodoFormComponent,
    canActivate: [authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodosRoutingModule {}
