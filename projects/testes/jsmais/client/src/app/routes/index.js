/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

// Imports 

import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

// Imports Pages

import Main from "../pages/main";
import Client from "../pages/clients";

// Routes

const Routes = () => (

    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main}></Route>
            <Route path="/client/:id" component={Client}></Route>
        </Switch>
    </BrowserRouter>
    
)

export default Routes;