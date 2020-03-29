/*
|--------------------------------------------------------------------------
| Index - Server
|--------------------------------------------------------------------------
*/

// Express | Http | MongoDB

let app = require('./config/express');
let http = require('http').Server(app);
let database = require('./config/database');   
 
// Running Database 

database.connect();

// Running Server 

http.listen(3002, () => {
    console.log(`Servidor Rodando na porta 3002`)
}) 

 