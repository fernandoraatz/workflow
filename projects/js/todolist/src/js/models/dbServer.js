/*
|--------------------------------------------------------------------------
| Database
|--------------------------------------------------------------------------
*/

export class DatabaseServer{

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

}
