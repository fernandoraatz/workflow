import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Services

import { PokeapiService } from '../../services/pokeapi.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  pokemonNumber: number;
  pokemon: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokeapi: PokeapiService
  ) { }

  ngOnInit() {

    this.activatedRoute.params
    .subscribe((params: any) => {
      this.pokemonNumber = parseInt(params['number'], 10);
      this.getPokemon();
    })
  }

  getPokemon(){
    
    this.pokeapi.getItem(this.pokemonNumber)
      .subscribe(response => {
        this.pokemon = response;
      })
  }

}
