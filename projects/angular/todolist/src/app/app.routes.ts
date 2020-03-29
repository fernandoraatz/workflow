/*
|--------------------------------------------------------------------------
| Routes - Main
|--------------------------------------------------------------------------
*/ 

// Angular Modules

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// View Components

import { ListComponent } from './todolist/list/list.component'
import { FormComponent } from './todolist/add/add.component'

// Routes Config

const APP_ROUTES: Routes = [
     { 
         path: '', 
         component: ListComponent 
     }, 
     {  
         path: 'add', 
         component: FormComponent 
     },
     { 
         path: 'add/:id', 
         component: FormComponent 
     }
 ];

 // Routes Exports
 
 @NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule]
 })
 export class AppRoutingModule{}