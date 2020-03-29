/*
|--------------------------------------------------------------------------
| Main Component - App
|--------------------------------------------------------------------------
*/

// Imports
 
import React from 'react';
import Routes from './routes';

// Imports Components

import Header from './components/header';
import Footer from './components/footer';
 
// Import style

import  '../assets/sass/style.scss'; 
import  './app.scss';

// Main component

const App = () => (
  <div className="App">
    <Header/> 
    <Routes /> 
    <Footer/> 
  </div>
);


export default App;
