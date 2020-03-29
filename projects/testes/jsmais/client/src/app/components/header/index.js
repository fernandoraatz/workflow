
import React from 'react';
import './styles.scss'

const Header = () => (
    
    <header>
        <div className="container">
            <div className="logo">
                <span><a href="/"><img src="https://www.votorantimcimentos.com.br/wp-content/uploads/2018/10/juntosbranco.png" alt="logo"/></a></span>
            </div>
            <nav className="menu">
					<ul>
						<li><a href="https://www.juntossomosmais.com.br/fale-conoscob.php">Juntos Somos +</a></li>
						<li><a href="https://www.juntossomosmais.com.br/fale-conoscob.php">Fale Conosco</a></li>
						<li><a href="/">Clientes</a></li>
					</ul>
			</nav>
        </div>
    </header>
);

export default Header;

