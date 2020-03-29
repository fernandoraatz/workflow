/*
|--------------------------------------------------------------------------
| Index - Server
|--------------------------------------------------------------------------
*/

// Express | MongoDB

const app = require('./config/express');
const database = require('./config/database');

// Running Database 

database.connect();

// Running Database 

app.listen(5001, () => console.info(`Server running on door 5001`));  
