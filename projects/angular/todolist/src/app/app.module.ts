/*
|--------------------------------------------------------------------------
| Model - Main
|--------------------------------------------------------------------------
*/ 

// Angular Modules

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Shared Components

import { HeaderComponent, SidebarComponent, SearchComponent } from './components';
import { AppComponent } from './app.component';

// Modules

import { TodolistModule } from './todolist/todolist.module';

// Routes

import { AppRoutingModule } from './app.routes';

// Module Config

@NgModule({
  declarations: [ 
    AppComponent,
    HeaderComponent, 
    SidebarComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TodolistModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
