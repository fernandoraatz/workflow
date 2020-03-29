import { Component, OnInit } from '@angular/core';

// Services

import { PokeapiService } from '../../services/pokeapi.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  pokemonList = [];
  nameFilter = '';
  
  constructor(
    private pokeapi: PokeapiService
  ) { }

  ngOnInit() {
      this.list()
  }

  list(){
    this.pokeapi.getAll().subscribe( response => {
      response.results.forEach(pokemon => this.getPokemonNumber(pokemon))
      this.pokemonList = this.filterPokemon(response);
    }
   )
  }
  
  // Get Pokemon Number

  private getPokemonNumber(pokemon){
      pokemon.number = this.getNumberFromUrl(pokemon.url);
  }

  private getNumberFromUrl(url){
    return parseInt(url.replace(/.*\/(\d+)\/$/, '$1'));
  }

  // Sort and filterPokemon List

  private sortPokemon(pokemonList){
    return pokemonList.sort((a, b) => {
      return (a.number > b.number ? 1 : -1);
    })
  }

  private filterPokemon(response){
    return this.sortPokemon(response.results).filter(pokemon => pokemon.number <= 151);
  }

}
