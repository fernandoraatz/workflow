/*
|--------------------------------------------------------------------------
| Menu - Controller
|--------------------------------------------------------------------------
*/

// Import objects

import { Template } from '../views/template';

// Class Menu

export class Menu{

    constructor(){
        this.template = new Template();
    }

    newItem(){
        alert('Ação de Novo Item')
    }

    appendItem(){
        this.template.refresh('Parágrafo Teste')
    }

}
