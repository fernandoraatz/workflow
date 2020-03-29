/*
|--------------------------------------------------------------------------
| Controller - Todos
|--------------------------------------------------------------------------
*/

// Helper

const Parser = require('../helpers/parserHelper'); 
const Type = require('../helpers/typeHelper'); 
const Region = require('../helpers/regionHelper'); 

// Model

const mongoose = require('mongoose');
const Client = mongoose.model('Client');

// Controller Class

class ClientController{

    // List All

    async list(req, res){
        const {page = 1} = req.query; 
        const clients = await Client.paginate({}, {page, limit: 9});
        console.log('[v] Successfully get clients');
        return res.status(200).json(clients);
    }

    // List By Id

    async getById(req, res){
        const client = await Client.findById(req.params.id);
        console.log('[v] Successfully get clients by ID');
        return res.status(200).json(client); 
    }

    // Save

    async save(req, res){
        const clients = req.body.results;

        for (var key in clients) {
            var client = clients[key];
            Parser.genderParser(client);
            Parser.nationalityParser(client);
            Parser.ageParser(client);
            Parser.phoneParser(client);
            Type.verify(client);
            Region.verify(client);

            var clientSet = await Client.create(client);
        } 

        console.log('[v] Successfully save client(s)');

        return res.status(200).json(clientSet); 
    }

    // List By Region

    async listByRegion(req, res){
        const {page = 1} = req.query; 
        const clients = await Client.paginate(
            { "location.region" : req.params.region },
            {page, limit: 200}
        );
        console.log('[v] Successfully list client by region');
        return res.json(clients); 
    }

    // List By Type

    async listByType(req, res){
        const {page = 1} = req.query; 
        const clients = await Client.paginate(
            {"type" : req.params.type },
            {page, limit: 200}
        );
        console.log('[v] Successfully list client by type');
        return res.status(200).json(clients); 
    }
    
} 


module.exports = new ClientController();