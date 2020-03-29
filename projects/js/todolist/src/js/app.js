/*
|--------------------------------------------------------------------------
| App
|--------------------------------------------------------------------------
*/

// Import objects

import { Template } from './views/template';
import { Database } from './models/db';
import { Main } from './controllers/main';


class Core{

    constructor(){
        this.database = new Database();
        this.template = new Template();
        this.main = new Main();
    }

    initDatabase(){

        this.database.start().then( db => {
            db.findAll().then( itemsList => {
                this.template.refresh(itemsList)
            });
        })
    }

    initApp(){
        this.main.start();
    }

}


// Start App

let core = new Core();
core.initDatabase();
core.initApp();
