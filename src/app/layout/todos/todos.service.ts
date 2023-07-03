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
  private todosUpdated = new Subject<{todos: Todo[]}>();

  constructor(
    private http: HttpClient,
    public authService: AuthService,
    private router: Router
  ) {}

  private userId: String = this.authService.getUserId();
  private token: string = this.authService.getToken();

  getTodos() {
    console.log("gola");
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
      ).subscribe((transfordeData)=>{
        console.log(transfordeData);
        this.todos = transfordeData.todos;
        this.todosUpdated.next({todos: this.todos});
      });
  }

  getTodosUpdatedListener(){
    console.log(this.todosUpdated);
    return this.todosUpdated.asObservable();
  }

  createTodo(todoData:any) {
    const todo = todoData;
    todo.userId = this.userId
    this.http
      .post<{ message: string; todo: Todo }>(
        `${BACKEND_URL}/todos/create`,
        todo
      )
      .subscribe((responseData) => {
        console.log('create todo service', responseData);
        this.router.navigate(['/todos']);
      });
  }

  updateTodo() {}

  deleteTodo() {}
}
