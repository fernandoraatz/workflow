/*
|--------------------------------------------------------------------------
| Model - Todolist
|--------------------------------------------------------------------------
*/ 

// Angular Modules

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// View Components

import { ListComponent } from './list/list.component';
import { FormComponent } from './add/add.component';

// Shared Components

import { PageheaderComponent, ButtonComponent } from '../components';

// Pipes and Services

import { SearchPipe } from '../pipes/search.pipe'; 
import { TodoService } from '../services/todo.service';

// Routes

import { AppRoutingModule } from '../app.routes';

// Module Config

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [TodoService],
  declarations: [
    ListComponent,
    FormComponent,
    PageheaderComponent,
    SearchPipe,
    ButtonComponent
  ]
  
})
export class TodolistModule { }
