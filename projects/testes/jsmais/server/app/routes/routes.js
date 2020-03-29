/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

// Modules

const express = require('express');
const routes = express.Router();

// Controller

const ClientController = require('../controllers/ClientController'); 

// Routes

routes.get('/clients', ClientController.list); 
routes.get('/clients/region/:region', ClientController.listByRegion); 
routes.get('/clients/type/:type', ClientController.listByType); 
routes.get('/clients/:id', ClientController.getById); 
routes.post('/clients', ClientController.save);

// Export

module.exports = routes;  