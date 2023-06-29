import { Component } from '@angular/core';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent {
  todoArr = [];

  recieveTodos($event: any) {
    this.todoArr = $event;
    console.log(this.todoArr);

  }
}
