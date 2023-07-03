import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { Todo } from '../../todo.model';
import { TodosService } from '../../todos.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  todoArr: Todo[] = [];

  public todoSubscription!: Subscription;
  public userIsAuthenticated = false;

  constructor(
    public todosService: TodosService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.todosService.getTodos();
    this.todoSubscription = this.todosService
      .getTodosUpdatedListener()
      .subscribe((todosData: { todos: Todo[] }) => {
        this.todoArr = todosData.todos;
      });
  }
}
