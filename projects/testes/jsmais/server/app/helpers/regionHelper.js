/*
|--------------------------------------------------------------------------
| Helpers - Region
|--------------------------------------------------------------------------
*/

// Region Class

class Region{

    verify(client){

        let norte = ['acre', 'amapa', 'amazonas', 'para', 'rondonia', 'roraima', 'tocantins'];
        let nordeste = ['alagoas', 'bahia', 'ceará', 'maranhão', 'paraíba', 'pernambuco', 'piauí', 'rio grande do norte', 'sergipe'];
        let centroOeste = ['distrito federal', 'goias', 'mato grosso do sul', 'mato grosso'];
        let sudeste = ['são paulo', 'espírito santos', 'rio de janeiro', 'minas gerais'];
        let sul = ['santa catarina', 'rio grande do sul', 'paraná']; 

        let region = client.location.state;

        if(norte.includes(region)){
            client.location.region = "norte"
        }
        if(nordeste.includes(region)){
            client.location.region = "nordeste"
        }
        if(centroOeste.includes(region)){
            client.location.region = "centro-oeste"
        }
        if(sudeste.includes(region)){
            client.location.region = "sudeste" 
        }
        if(sul.includes(region)){
            client.location.region = "sul"
        }
        
        return client;

    }


} 


module.exports = new Region();