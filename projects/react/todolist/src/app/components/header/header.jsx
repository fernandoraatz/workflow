/*
|--------------------------------------------------------------------------
| Header - Component
|--------------------------------------------------------------------------
*/

// Import

import React from 'react' 
import  './header.scss';
import { Link } from 'react-router-dom';

// Header Component

export default props => (
    <header>
      <Link to="/"> 
        <h1 className="header-title">React - Todolist</h1>
      </Link>
  </header>
)