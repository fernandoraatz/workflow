/*
|--------------------------------------------------------------------------
| Sidebar - Component
|--------------------------------------------------------------------------
*/

// Import

import React from 'react'
import  './sidebar.scss';
import { Link } from 'react-router-dom';

// Sidebar Component

export default props => (
    <aside>
        <nav>
            <ul>
                <li>
                    <Link to="/">Listar</Link>
                    <Link to="/add">Adicionar</Link>  
                </li> 
            </ul>
        </nav>
    </aside> 
)