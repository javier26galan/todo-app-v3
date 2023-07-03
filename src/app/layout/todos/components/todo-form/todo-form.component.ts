import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TodosService } from '../../todos.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent implements OnInit {
  form!: FormGroup;

  constructor(public todosService: TodosService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(''),
      content: new FormControl(''),
    });
  }

  onSaveTodo() {
    const todo = {
      title: this.form.value.title,
      content: this.form.value.content,
    };
    this.todosService.createTodo(todo);
    this.form.reset();
  }
}
