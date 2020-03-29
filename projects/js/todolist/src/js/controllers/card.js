/*
|--------------------------------------------------------------------------
| Modal Card - Controller
|--------------------------------------------------------------------------
*/

// Import objects

import { Database } from '../models/db';
import { Template } from '../views/template';

// Class Modal Card

export class Card{

    constructor(){
        this.database = new Database();
        this.template = new Template();
        this.modal = document.querySelector('#item-dialog'),
        this.selected_item_id = null;
    }

    // Open modal

    open(itemId){
        this.modal.querySelector('.close').addEventListener('click', this.close);
        this.modal.showModal();
        this.setItem(itemId);
        this.selected_item_id = itemId;
    }

    // Close modal

    close(){
        document.querySelector('#item-dialog').close()  
    }

    // Check Item

    check(itemId){
        this.selected_item_id = itemId;
        this.database.find(itemId).then(item => {
            item.isChecked = !item.isChecked;
            this.save(item);
        })
    }

    // Remove

    remove(itemId){
       
        this.selected_item_id = itemId;
        this.database.remove(itemId).then(item_list => {
            console.log(item_list)
            this.template.refresh(item_list);
            this.close();
        })
    } 

    // Update or Save Data

    save(item){
        var item_values = item || this.getItemValues();
        (this.selected_item_id ? this.database.update(item_values) : this.database.insert(item_values))
        .then(item_list => {
            this.template.refresh(item_list);
            this.close();
        }) 
    }

    // HELPER METHODS

    // Fill fields, for edit purposes || called by open method

    setItem(itemId){
        var form = this.getElements();
        if(!itemId){
            form.title.value = '';
            form.description.value = '';
        }else{
            this.database.find(itemId).then(item => {
                form.title.value = item.title;
                form.description.value = item.description;
            })
        }
    }

    // Get Form Elements || called by setItem and getItemValues methods

    getElements(){
        var title = this.modal.querySelector('#title');
        var description = this.modal.querySelector('#description');

        return {title, description};
    }

    // Get Form Values || called by save method

    getItemValues(){
        var form = this.getElements();
        var title = form.title.value;
        var description = form.description.value;
        return {
            title: title,
            description: description
        };
    }


}