import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PokeListResponse } from '../models/pokemon.interface';

@Injectable({ 
  providedIn: 'root' 
})
export class PokeapiService {

  private url = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(
    private http: HttpClient
  ) {}

  // Get All Pokemon From API

  getAll(){
    return this.http.get<PokeListResponse>(`${this.url}`) 
  }

  getItem(pokemonNumber: Number){
    return this.http.get<PokeListResponse>(`${this.url}${pokemonNumber}/`) 
  }


}
