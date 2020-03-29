/*
|--------------------------------------------------------------------------
| Main Controller
|--------------------------------------------------------------------------
*/

// Import modules 

import { Menu } from './index';
 
// Class Controlller

export class Main{

    constructor(){
        this.menu = new Menu();
        this.menuView = document.querySelector('.sidebar-navigation')
    }

    // Init 
 
    start(){
      this.listenAppElements();
    }

    // Listen Menu Events

    listenAppElements(){

        this.menuView.addEventListener('click', (event) => {
            switch(event.target.dataset['action']){
                case 'newItem': this.menu.newItem(); break;
                case 'appendItem': this.menu.appendItem(); break;
            }
        })
    }

}