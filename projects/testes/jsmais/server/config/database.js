/*
|--------------------------------------------------------------------------
| Config - Database
|--------------------------------------------------------------------------
*/

// Require Mongoose 

const mongoose = require('mongoose');

// MongoDB

class MongoDB{

    constructor(){
        this.databaseName = "jsmais_clients"   
    }

    connect(){
        mongoose.connect(
            `mongodb://mongo:27017/${this.databaseName}`, 
             {useNewUrlParser:true}
        );

        mongoose.connection.on('connected', () => {
            console.info('[v] Connected to MongoDB')
        }); 

        mongoose.connection.on('disconnected', () =>{
              console.info('[v] Disconnected to MongoDB')
        });

        mongoose.connection.on('error', (error) => {
            console.info(`[x] Connection Error:${error}`)
        });
    }
} 

// Export

module.exports = new MongoDB();