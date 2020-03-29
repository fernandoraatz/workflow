/*
|--------------------------------------------------------------------------
| Routes - Main
|--------------------------------------------------------------------------
*/ 

// Angular Modules

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// View Components

import { ListComponent } from './pokedex/list/list.component'
import { DetailComponent } from './pokedex/detail/detail.component'

// Routes Config

const APP_ROUTES: Routes = [
     { 
         path: '', 
         component: ListComponent 
     }, 
     {  
         path: 'pokemon/:number', 
         component: DetailComponent 
     }
 ];

 // Routes Exports
 
 @NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule]
 })
 export class AppRoutingModule{}