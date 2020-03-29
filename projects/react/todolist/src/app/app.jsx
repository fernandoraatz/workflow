/*
|--------------------------------------------------------------------------
| Main Component - App
|--------------------------------------------------------------------------
*/

// Import 

var $ = document.querySelector.bind(document);

// Import css/js 

import  '../assets/sass/style.scss';
import  './app.scss';
 
// Imports React and Routes
 
import React from 'react'
import { BrowserRouter as Router, Route, BrowserHistory} from 'react-router-dom';

// Imports Componentes

import Header from './components/header/header'
import Menu from './components/sidebar/sidebar'
import List from './todolist/list/list' 
import Form from './todolist/form/form' 

// Main component

export default props => ( 
              
    <Router history={BrowserHistory}>
        <div>
            <Header/>
            <Menu/>  
            <main className="content-sidebar">
                <Route exact path='/' component={List} />
                <Route exact path='/add' component={Form} />
                <Route exact path='/add/:id' component={Form} />
            </main>
        </div>
    </Router>
      
)