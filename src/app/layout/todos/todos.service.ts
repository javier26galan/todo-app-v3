import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';
import { Todo } from './todo.model';
import { Subject, map } from 'rxjs';
import { Router } from '@angular/router';

const BACKEND_URL = environment.backend;

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private todos: Todo[] = [];
  private todosUpdated = new Subject<{ todos: Todo[] }>();

  constructor(
    private http: HttpClient,
    public authService: AuthService,
    private router: Router
  ) {}

  private userId!: String;

  private token: string = this.authService.getToken();

  getTodos() {
    this.userId = this.authService.getUserId();
    this.http
      .get<{ message: string; todos: any }>(
        `${BACKEND_URL}/todos/${this.userId}`
      )
      .pipe(
        map((todoData) => {
          return {
            todos: todoData.todos.map((todo: any) => {
              return {
                id: todo._id,
                title: todo.title,
                content: todo.content,
                userId: todo.userId,
              };
            }),
          };
        })
      )
      .subscribe((transfordeData) => {
        this.todos = transfordeData.todos;
        this.todosUpdated.next({ todos: this.todos });
      });
  }

  getTodosUpdatedListener() {
    return this.todosUpdated.asObservable();
  }

  createTodo(todoData: any) {
    const todo = todoData;
    todo.userId = this.userId;
    this.http
      .post<{ message: string; todo: Todo }>(
        `${BACKEND_URL}/todos/create`,
        todo
      )
      .subscribe((responseData) => {
        this.router.navigate(['/todos']);
      });
  }

  deleteTodo(pId: String) {
    this.http.delete(`${BACKEND_URL}/todos/${pId}`).subscribe((response) => {
      this.router.navigate(['/todos']);
    });
  }

  doneTodo(pId: String) {
    this.http.delete(`${BACKEND_URL}/todos/${pId}`).subscribe((response) => {
      this.router.navigate(['/todos']);
    });
  }

  updateTodo() {}
}
