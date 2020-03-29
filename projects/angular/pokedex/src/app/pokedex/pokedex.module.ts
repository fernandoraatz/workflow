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
import { DetailComponent } from './detail/detail.component';

// Services 

import { PokeapiService } from '../services/pokeapi.service';
import { PokeNumberPipe } from '../pipes/number.pipe';
import { SearchPipe } from '../pipes/search.pipe';

// Shared Components

import { PageheaderComponent, ButtonComponent } from '../components';

// Module Config

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PokeapiService],
  declarations: [
    ListComponent,
    DetailComponent,
    PageheaderComponent,
    ButtonComponent,
    PokeNumberPipe,
    SearchPipe
  ]
  
})
export class PokedexModule { }
