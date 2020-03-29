import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListComponent } from './list.component';

import { TodoService } from '../../services/todo.service';

@NgModule({
  imports: [ 
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ListComponent
  ],
  providers: [TodoService],
  declarations: []
})
export class TodoModule { }
