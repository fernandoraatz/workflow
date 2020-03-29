/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

// Modules

const express = require('express');
const routes = express.Router();

// Controller

const ProductController = require('../controllers/ProductController'); 

// Routes

routes.get('/products', ProductController.list);
routes.post('/products', ProductController.save); 
routes.get('/products/:id', ProductController.getById);
routes.put('/products/:id', ProductController.update); 
routes.delete('/products/:id', ProductController.delete);   

// Export

module.exports = routes;  