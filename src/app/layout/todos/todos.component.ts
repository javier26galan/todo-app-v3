import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodosService } from './todos.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { Todo } from './todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit, OnDestroy {
  todoArr: Todo[] = [];


  public todoSubscription!: Subscription;
  public userIsAuthenticated = false;
  private authStatusSub!: Subscription;

  constructor(
    public todosService: TodosService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    console.log(this.todoArr);

    this.userIsAuthenticated = this.authService.getIsAuth();
    console.log(this.userIsAuthenticated);

    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
