/*
|--------------------------------------------------------------------------
| Database
|--------------------------------------------------------------------------
*/

let request;
let db;

export class Database{

    constructor(){
        this.name = 'toDo',
        this.table = 'ToDoItems'
    }


    // Init Database

    start(){
        return new Promise(resolve =>{
            request = indexedDB.open(this.name, 1);
            request.onsuccess = (event) => { db = request.result; resolve(this);}
            request.onupgradeneeded = (event) => {
                db = event.target.result;
                db.createObjectStore(this.table, { keyPath: 'id' });
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
        return new Promise(resolve => {
            var request = this.getObjectStore().delete(item);
            request.onsuccess = (event) => { resolve(this.findAll()) }
        })
    }

    // Check All Itens

    checkAll(isChecked = false){
        var isAllUpdated = false;
        var isUpdated = false;

        return new Promise(resolve => {
            this.getObjectStore().openCursor().onsuccess = (event) => {
                var cursor = event.target.result;
                if(cursor){
                    isUpdated = false;
                    var newData = cursor.value;
                    newData.isChecked = isChecked;
                    var request = cursor.update(newData);
                    request.onsuccess = () => {
                        isUpdated = true;
                        if(isAllUpdated && isUpdated){
                            resolve(this.findAll());
                        }
                    }
                    cursor.continue();
                }else{
                    isAllUpdated = true;
                    if(isAllUpdated && isUpdated){
                        resolve(this.findAll());
                    }
                }
            }
        })

    }

    // Remove all itens checked

    clearAll(){
        var isAllRemoved = false;
        var isRemoved = false;
        return new Promise(resolve => {
            this.getObjectStore().openCursor().onsuccess = (event) => {
                var cursor = event.target.result;
                if(cursor){
                    isRemoved = false;
                    if(cursor.value.isChecked){
                        var request = cursor.delete();
                        request.onsuccess = () => {
                            isRemoved = true;
                            if(isAllRemoved && isRemoved){
                                resolve(this.findAll());
                            }
                        }
                    }else{
                        isRemoved = true;
                    }
                    cursor.continue();
                }else{
                    isAllRemoved = true;
                    if(isAllRemoved && isRemoved){
                        resolve(this.findAll());
                    }
                }
            }
        })
    }

    // HELPER DATABASE FUNCTION 

    // Get Store/Table

    getObjectStore(){
        return db.transaction([this.table], 'readwrite').objectStore(this.table);
    }

}
