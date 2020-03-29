/*
|--------------------------------------------------------------------------
| Database
|--------------------------------------------------------------------------
*/

export class DatabaseServer{

    constructor(){
      this.url = 'http://localhost:3005/'
    }

    getServer(){
      return fetch(this.url).then(response => response.json());
    }

    postServer(item){
      return fetch(this.url, {
                    'method': 'POST',
                    'Content-Type': 'application/json',
                    'body': JSON.stringify(item)
                  })
                  .then(response => response.json()
                )
    }

}
