import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search' 
})
export class SearchPipe implements PipeTransform {

  transform(pokemonList: any, nameFilter: string): any {
    if(!pokemonList) return [];
    if(!nameFilter) return pokemonList;

    nameFilter = nameFilter.toLowerCase(); 
    return pokemonList.filter( pokemon => pokemon.name.toLowerCase().includes(nameFilter));
  }

}


