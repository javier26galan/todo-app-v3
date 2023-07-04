import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { Todo } from '../../todo.model';
import { TodosService } from '../../todos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  todoArr: Todo[] = [];

  public todoSubscription!: Subscription;

  constructor(public todosService: TodosService) {}

  deleteTodo(index: any) {
    const id: String = this.todoArr[index].id;
    this.todosService.deleteTodo(id);
    this.todosService.getTodos();
    this.todoSubscription = this.todosService
      .getTodosUpdatedListener()
      .subscribe((todosData: { todos: Todo[] }) => {
        this.todoArr = todosData.todos;
      });
  }

  doneTodo(index: any) {
    if (localStorage['todosDone']) {
      localStorage['todosDone'] = Number(localStorage['todosDone']) + 1;
      this.todosService.doneTodo(
        localStorage['userId'],
        Number(localStorage['todosDone'])
      );
      this.deleteTodo(index);
    } else {
      console.log('you need to login');
    }
  }

  ngOnInit() {
    this.todosService.getTodos();
    this.todoSubscription = this.todosService
      .getTodosUpdatedListener()
      .subscribe((todosData: { todos: Todo[] }) => {
        this.todoArr = todosData.todos;
      });
  }
}
