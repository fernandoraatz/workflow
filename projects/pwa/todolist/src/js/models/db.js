/*
|--------------------------------------------------------------------------
| Database
|--------------------------------------------------------------------------
*/

let request;
let db;

export class Database{

        constructor(){
            this.selectItem = {}
        }

        getObjectStore(){
            return db.transaction(['ToDoItems'], 'readwrite').objectStore('ToDoItems');
        }

        getServer(){
          var data = fetch('http://localhost:3005/').then(response => response.json());
          return data;
        }

        postServer(item){
          var data = fetch('http://localhost:3005/', {
                      'method': 'POST',
                      'Content-Type': 'application/json',
                      'body': JSON.stringify(item)
                    })
                    .then(response => response.json()
                  )
          return data;
        }

        start(){
            return new Promise(resolve =>{
              // Fazendo uma requisicao de abertura do banco
              request = indexedDB.open('toDo', 1);

              // Se der sucesso retorna o banco
              request.onsuccess = (event) => {
                  db = request.result;
                  resolve(this);
              }

              // Evento chamado quando cria ou atualiza o banco
              request.onupgradeneeded = (event) => {
                  db = event.target.result;
                  db.createObjectStore('ToDoItems', { keyPath: 'id' });
              }
            })
        }

        find(id){
          return new Promise(resolve => {
              var request = this.getObjectStore().get(+id);
              request.onsuccess = (event) => {
                  this.selectedItem = request.result;
                  resolve(request.result);
              }
          })
        }

        findAll(location = 'server'){
          return new Promise(resolve => {
            if(navigator.onLine && location === 'server'){
                resolve(this.getServer());
            }else{
              console.log(this)
              var request = this.getObjectStore().getAll();
              request.onsuccess = (event) => {
                  resolve(request.result);
              }
            }
          })
        }

        insert(item){
          return new Promise(resolve => {
              item.id = (new Date()).getTime();
              item.isChecked = false;

              if(navigator.onLine){
                resolve(this.postServer(item));
              }else{
                var request = this.getObjectStore().add(item);
                request.onsuccess = (event) => {
                    resolve(this.findAll())
                    navigator.serviceWorker.ready.then(function(registration){
                        return registration.sync.register('newItem');
                    })
                 }
              }
          })

        }

        update(item){
          return new Promise(resolve => {
              var updatedItem = Object.assign(this.selectedItem, item);
              var request = this.getObjectStore().put(updatedItem);
              request.onsuccess = (event) => { resolve(this.findAll()) }
          })

        }

        remove(){
          return new Promise(resolve => {
              var request = getObjectStore().delete(id);
              request.onsuccess = (event) => { resolve(this.findAll()) }
          })
        }

        checkAll(isChecked = false){
          var isAllUpdated = false,
              isUpdated = false;
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

        clearAll(){
          var isAllRemoved = false,
              isRemoved = false;
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



}
