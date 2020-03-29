/*
|--------------------------------------------------------------------------
| Main Controller
|--------------------------------------------------------------------------
*/

// Import modules 

import { Menu, Card } from './index';
 
// Class Controlller

export class Main{

    constructor(){
        this.menu = new Menu();
        this.card = new Card();
        this.menuView = document.querySelector('.mdl-navigation')
        this.listView = document.querySelector('.todo-list')
        this.modalView = document.querySelector('.mdl-dialog')
    }

    // Init 
 
    start(){
      this.listenMenuElements();
      this.listenCardElements();
      this.listenModalElements();
    }

    // Listen Menu Events

    listenMenuElements(){

        this.menuView.addEventListener('click', (event) => {
            switch(event.target.dataset['action']){
                case 'newItem': this.menu.newItem(); break;
                case 'checkAll': this.menu.checkAll(); break;
                case 'uncheckAll': this.menu.uncheckAll(); break;
                case 'clearAll': this.menu.clearAll(); break;
            }
        })

    }

    // Listen Cards Events
 
    listenCardElements(){

        this.listView.addEventListener('click', (event) => {
            switch(event.target.parentElement.dataset['action']){
                case 'open':  this.card.open(event.target.parentElement.dataset['item']); break;
                case 'check': this.card.check(event.target.parentElement.dataset['item']); break;
                case 'remove': this.card.remove(event.target.parentElement.dataset['item']); break;
            }
        })
    }

    // Listen Modal Events

    listenModalElements(){

         this.modalView.addEventListener('click', (event) => {
            switch(event.target.parentElement.dataset['action']){
                case 'close': this.card.close(); break;
                case 'save':  this.card.save(); break;
            }
        })
    }

}