/*
|--------------------------------------------------------------------------
| Todo - Component
|--------------------------------------------------------------------------
*/

// Import

import React, { Component } from 'react'
import  './list/list.scss'; 
import Button from '../components/button/button'
import { Link } from 'react-router-dom';


// Todo Components
 
export default class TodoList extends Component {

    constructor(props){
        super(props) 
    }

    renderCards(){

        const itens = this.props.data.itens.filter(item =>{
            return item.title.includes(this.props.data.searchdata)
            }
        )

        return itens.map(item => (

          
            <div className="card-item" key={item.id}>
                    <div className="card-title">
                        <h2 onClick={() => this.props.deleteData(item.id)}>{item.title}</h2>
                    </div>
                    <div className="card-description">
                    {item.description} 
                    </div>
                    <div className="card-options" > 
                        <Button onClick={() => this.props.deleteData(item.id)} icon="clear"/>
                        <Link to={`/add/${item.id}`} ><Button icon="edit"/></Link>
                        <Button onClick={() => this.props.check(item.id)} icon={item.isChecked ? 'check_box' : 'check_box_outline_blank'} />
                    </div>  
            </div> 
        ))

    }

    render() {
    
        return ( 
            <div className="list-box">
                {this.renderCards()}
            </div>    
        )
    }


}