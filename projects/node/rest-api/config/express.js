/*
|--------------------------------------------------------------------------
| Config - Express
|--------------------------------------------------------------------------
*/

// Modules

const express = require('express');
const cors = require('cors');
const requireDir = require("require-dir");

// Express Module - App

const app = express();

// Require Models

requireDir("../app/models");

// Middlewares

app.use(express.json());
app.use(cors());
app.use('/api', require("../app/routes/routes"))  

// Express Export

module.exports = app;
 
