/*
|--------------------------------------------------------------------------
| Page - Main
|--------------------------------------------------------------------------
*/

// Imports 

import React, { Component } from 'react';
import './styles.scss'
import api from '../../services/api'
import {Link} from 'react-router-dom';

class Main extends Component {

	state = {
        clients: [],
        clientsInfo: {},
		page: 1,
		active: false
	}
	
    componentDidMount(){
        this.loadClients();
    }

    loadClients = async (page = 1, region, type) => { 

		var response;
		var currentState = this.state.active;

		if(region){
			response = await api.get(`/clients/region/${region}?page=${page}`);
			this.setState({ active: !currentState})
		}
		else if(type){ 
			console.log(type)
			response = await api.get(`/clients/type/${type}?page=${page}`);
			this.setState({ active: !currentState}) 
		}
		else{
			response = await api.get(`/clients?page=${page}`);
		}
 
        const { docs, ...clientsInfo } = response.data;
		this.setState({clients: docs, clientsInfo, page})
		
	}; 

	loadClientsByRegion = async (region, e) => {
		this.activeItem(e)
		this.loadClients(1, region)
	}; 

	loadClientsByType = async (type, e) => {  
		console.log(type)
		this.activeItem(e)
		this.loadClients(1,'',type)
	}; 

	activeItem = async(e) => {
		const _this = e.target;
		const lis = document.querySelectorAll('.filter-box li');

		lis.forEach(element => {
			element.classList.remove("selected");
		});

		_this.parentElement.classList.add("selected");

	}
	
	nextPage = () => {
        const { page, clientsInfo} = this.state;
        if(page === clientsInfo.pages) return;
        const pageNumber = page + 1;
        this.loadClients(pageNumber)
    }

    prevPage = () => {
        const { page} = this.state;
        if(page === 1) return;
        const pageNumber = page - 1;  
        this.loadClients(pageNumber) 
	}
	
	
	render(){

		const {clients, page, clientsInfo} = this.state;

		

		return(

			<main>
			<div className="container">

			<section className="breadcrumb">
						<ul>
							<li>Home ></li>
							<li>Clientes </li>
						</ul>
			</section>

			<aside className="sidebar">
						<div className="filter-box">
								<h4>Filtrar por usuário</h4>
								<ul>
									<li>
									<span  onClick={(e) => this.loadClientsByType('especial', e)}>Especial</span></li>
									<li><span onClick={(e) => this.loadClientsByType('normal', e)}>Normal</span></li>
									<li><span onClick={(e) => this.loadClientsByType('laborious', e)}>Trabalhoso</span></li>
								</ul>
						</div>
							<div className="filter-box">
								<h4>Filtrar por região</h4>
								<ul>
									<li><span onClick={(e) => this.loadClientsByRegion('norte', e)}>Norte</span></li>
									<li><span onClick={(e) => this.loadClientsByRegion('nordeste', e)}>Nordeste</span></li>
									<li><span onClick={(e) => this.loadClientsByRegion('centro-oeste', e)}>Centro-Oeste</span></li>
									<li><span onClick={(e) => this.loadClientsByRegion('sudeste', e)}>Sudeste</span></li>
									<li><span onClick={(e) => this.loadClientsByRegion('sul', e)}>Sul</span></li> 
								</ul>
						</div> 
			</aside> 

		<section className="content">

					<div className="list">

					{clients.map(client => (
							<article className="card" key={client._id}>
								<div className="card-thumb">
													<img alt={client.name.first} src={client.picture.large}/>
								</div>
									<div className="card-content"> 
										<h2 className="name">{client.name.first} {client.name.last}</h2>
										<div className="address">
											<span className="street">{client.location.street} </span>
											<span className="city">{client.location.city}</span><br/>
											<span className="region">{client.location.state} - </span>
											<span className="cep">CEP: {client.location.postcode}</span><br/>
											<Link className="btn-primary" to={`/client/${client._id}`}>Ver Detalhes</Link> 
										</div>
									</div>
							</article>
					))}

					</div>

					<div className="pagination">
					<button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
						<button disabled={page === clientsInfo.pages} onClick={this.nextPage}>Próxima</button>
					</div>

			</section>
			</div>
		</main>

	)}
}



export default Main;

