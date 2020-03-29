/*
|--------------------------------------------------------------------------
| Modal Card
|--------------------------------------------------------------------------
*/

// Bind $

let $ = document.querySelector.bind(document);

// Import objects

import { Database } from '../models/db';
import { Template } from '../views/template';

// Instantiate

let database = new Database();
let template = new Template(); 

// Class Modal Card

export class ModalCard{

    constructor(){
        this.modal =  $('#item-dialog'),
        this.selected_item_id = null 
    }

    // Abre o modal e insere dados se tiver

    open(itemId){
        var modal_box = this.modal; 
        modal_box.querySelector('.close').addEventListener('click', this.close);
        modal_box.showModal();
        this.setItem(itemId);
        this.selected_item_id = itemId;
    }

    // Fecha o modal

    close(){
        var btn_close = this; 
        // btn_close.removeEventListener('click', btn_close.close);
        $('#item-dialog').close() 

    }

    // Preenche os dados dos campos

    setItem(itemId){
        var form = this.getElements();
        if(!itemId){
            form.img.src = '';
            form.title.value = '';
            form.description.value = '';
        }else{
            database.find(itemId).then(item => {
                form.img.src = item.image || '';
                form.title.value = item.title;
                form.description.value = item.description;
            })
        }
    }

    check(itemId){
        this.selected_item_id = itemId;
        database.find(itemId).then(item => {
            item.isChecked = !item.isChecked;
            this.save(item);
        })
    }

    // Salva o item, inserindo ou atualizando

    save(item){
        var item_values = item || this.getItemValues();
        (this.selected_item_id ? database.update(item_values) : database.insert(item_values))
        .then(item_list => {
            template.toDoList(item_list);
            this.close();
        }) 
    }

    // Pega os elementos do formulário

    getElements(){
        var modal_box = this.modal;
        var img = modal_box.querySelector('#item-dialog-picture'),
            title = modal_box.querySelector('#title'),
            description = modal_box.querySelector('#description');

        return {img, title, description};
    }

    // Pega os valores do elementos

    getItemValues(){
        var form = this.getElements();
        return {
            title: form.title.value,
            description: form.description.value,
            image: form.img.getAttribute('src')
        };
    }


}