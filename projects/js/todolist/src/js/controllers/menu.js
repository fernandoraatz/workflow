/*
|--------------------------------------------------------------------------
| Menu - Controller
|--------------------------------------------------------------------------
*/

// Import objects

import { Database } from '../models/db';
import { Template } from '../views/template';
import { Card } from './card';

// Class Menu

export class Menu{

    constructor(){
        this.database = new Database();
        this.template = new Template();
        this.card = new Card();
    }

    newItem(){
        this.card.open(); 
        this.closeMenu();
    }

    checkAll(){
        this.database.checkAll(true).then(itemsList => {
            this.template.refresh(itemsList);
        })
    }

    uncheckAll(){
        this.database.checkAll(false).then(itemsList => {
            this.template.refresh(itemsList);
        })
    }

    clearAll(){
        this.database.clearAll().then(itemsList => {
            this.template.refresh(itemsList);
        })
        this.closeMenu();
    }

    closeMenu(){
        document.querySelector('.mdl-layout__obfuscator').click();
    }

}
