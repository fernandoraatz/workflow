/*
|--------------------------------------------------------------------------
| App
|--------------------------------------------------------------------------
*/

var $ = document.querySelector.bind(document);

// Import modules

import materialicons from '../css/material-icons.css';
import materialite from '../css/material-lite.css';
import style from '../css/style.css';
import materialitejs from '../js/vendors/material.min.js';

// Import objects

import { Template } from './views/template';
import { Database } from './models/db';
import { Controller } from './controllers/controller';

// Instantiate

let database = new Database();
let template = new Template();
let controller = new Controller();
 
// Register Service Worker

if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./service_worker.js')
    .then((registration) => {
        console.log('Service Worker registered with scope: ', registration.scope);
    })
    .catch((err) => {
        console.log('Service Worker registration failed: ', err);
    })
}

// Start DB

database.start().then( db => {
    db.findAll().then( itemsList => {
        template.toDoList(itemsList)
    });
})

// Start App

controller.start();
