/*
|--------------------------------------------------------------------------
| Page Header - Component
|--------------------------------------------------------------------------
*/

// Import

import React, { Component } from 'react'
import  './pageheader.scss';  

// Todo Component
 
export default class PageHeader extends Component {

    constructor(props){
        super(props)
    }

    render() {
    
        return ( 
            <div className="page-title">
                <h1>{this.props.title}</h1>
            </div> 
        )
    }
}