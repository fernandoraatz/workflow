/*
|--------------------------------------------------------------------------
| Page - Main
|--------------------------------------------------------------------------
*/

// Imports 

import React, { Component } from 'react';
import './styles.scss'
import api from '../../services/api';
import {Link} from 'react-router-dom';

class Client extends Component {

	state = {
			client: [],
			name: '',
			surname: '',
			region: '',
			picture: ''
	};

	 componentDidMount(){

		this.loadClients();
	}
	
	loadClients = async () => { 

		const { id } = this.props.match.params;

		const response = await api.get(`/clients/${id}`);

		const name =  response.data.name.first;
		const surname =  response.data.name.last;
		const region =  response.data.location.region;
		const picture =  response.data.picture.large;

		this.setState({client: response.data, name, surname, region, picture})
	};
	
	
	render(){

		const{ client, name, surname, region, picture } = this.state;


		return(
			
			<main>
			<div className="container">

			<section className="breadcrumb">
						<ul>
							<li><a href="/">Home</a> ></li>
							<li><a href="/">Clientes</a> ></li>
							<li>Detalhes </li>
						</ul>
			</section>


	
	<aside className="sidebar">

					<article className="card" >
							<div className="card-thumb">
												<img alt={ name } src={picture}/>
							</div>
								<div className="card-content"> 
									<h2 className="name">{ name } {surname}</h2>
	
								</div>
						</article>

			</aside> 

		<section className="content">

					<div className="list">
						<table>
							<tr>
								<td>Nome</td>
								<td class="name">{ name }</td> 
							</tr>
							<tr>
								<td>Sobrenome</td>
								<td class="name">{ surname }</td> 
							</tr>
							<tr>
								<td>Gênero</td>
								<td>{ client.gender }</td> 
							</tr>
							<tr>
								<td>Tipo</td>
								<td>{ client.type }</td> 
							</tr>
							<tr>
								<td>Email</td>
								<td class="no-cap">{ client.email }</td> 
							</tr>
							<tr>
								<td>Região</td>
								<td>{ region }</td> 
							</tr>
							<tr>
								<td>Telefone</td>
								<td>{ client.telephoneNumbers }</td> 
							</tr>
							<tr>
								<td>Celular</td>
								<td>{ client.mobileNumbers }</td> 
							</tr>
							<tr>
								<td>Nacionalidade</td>
								<td>{ client.nationality }</td> 
							</tr>
							
						</table>
			

					</div>

			<Link className="btn-primary" to={`/`}>Voltar</Link> 

			</section>
			</div>
		</main>

		)

	}
}



export default Client;

