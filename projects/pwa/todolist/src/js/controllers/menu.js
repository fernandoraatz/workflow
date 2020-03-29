/*
|--------------------------------------------------------------------------
| Menu
|--------------------------------------------------------------------------
*/

// Import objects

import { Database } from '../models/db';
import { Template } from '../views/template';
import { ModalCard } from './card';

// Instantiate

let database = new Database();
let template = new Template();
let modalCard = new ModalCard();

// Class Menu

export class Menu{

    newItem(){
        modalCard.open();
        this.closeMenu();
    }

    checkAll(){
        database.checkAll(true).then(itemsList => {
            template.toDoList(itemsList);
        })
    }

    uncheckAll(){
        database.checkAll(false).then(itemsList => {
            template.toDoList(itemsList);
        })
    }

    clearAll(){
        database.clearAll().then(itemsList => {
            template.toDoList(itemsList);
        })
        this.closeMenu();
    }

    closeMenu(){
        document.querySelector('.mdl-layout__obfuscator').click();
    }

}
