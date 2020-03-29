
import React from 'react';
import './styles.scss'

const Footer = () => (
    
    <footer>
			<div className="container">

			<div className="logo">
            <img alt="logo" src="https://www.votorantimcimentos.com.br/wp-content/uploads/2018/10/juntosbranco.png"/></div>
			<div className="copyright">
				<strong>Printing Manager - Todos os direitos reservados</strong>
			</div>
			<div className="social">
				<span>Siga-nos em nosass redes sociais</span>
				<ul>
					<li>
							<a href="https://facebook.com">
								<i className="icon-facebook"></i>
							</a>
					</li>
					<li>
							<a href="https://instagram.com">
								<i className="icon-instagram"></i>
							</a>
					</li>
				</ul>
			</div>

			
			</div>
    </footer>
);

export default Footer;

