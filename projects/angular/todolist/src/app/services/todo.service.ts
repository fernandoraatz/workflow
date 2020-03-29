import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  request: any;
  db: any;
  name: any;
  table: any;
  selectedItem: any;

  constructor(){
    this.name = 'toDo',
    this.table = 'ToDoItems'
  }


    // Init Database

    start(){
        return new Promise(resolve =>{
            this.request = indexedDB.open(this.name, 1);
            this.request.onsuccess = (event) => { this.db = this.request.result; resolve(this);}
            this.request.onupgradeneeded = (event) => {
            this.db = event.target.result;
            this.db.createObjectStore(this.table, { keyPath: 'id' });
            }
        })
    } 

    // Get Item

    find(id){
        return new Promise(resolve => {
            var request = this.getObjectStore().get(+id);
            request.onsuccess = (event) => {
                this.selectedItem = request.result;
                resolve(request.result);
            }
        })
    }

    // Get All Item

    findAll(){
        return new Promise(resolve => {
            var request = this.getObjectStore().getAll();
            request.onsuccess = (event) => {
                resolve(request.result);
            }
        })
    }

    // Insert Item

    insert(item){
        return new Promise(resolve => {
            item.id = (new Date()).getTime();
            item.isChecked = false;
            var request = this.getObjectStore().add(item);
            request.onsuccess = (event) => {
                resolve(this.findAll())
                }
        })
    }

    // Update Item

    update(item){
        return new Promise(resolve => {
            var updatedItem = Object.assign(this.selectedItem, item);
            var request = this.getObjectStore().put(updatedItem);
            request.onsuccess = (event) => { resolve(this.findAll()) }
        })

    }

    // Remove Item

    remove(item){ 
        console.log(item)
        return new Promise(resolve => {
            var request = this.getObjectStore().delete(item);
            request.onsuccess = (event) => { resolve(this.findAll()) }
        })
    }

    // HELPER DATABASE FUNCTION 

    // Get Store/Table

    getObjectStore(){
        return this.db.transaction([this.table], 'readwrite').objectStore(this.table);
    }
}
