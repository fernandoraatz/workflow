/*
|--------------------------------------------------------------------------
| Advertising Fixed
|--------------------------------------------------------------------------
*/

var $ = document.querySelector.bind(document);

class AdvertsingFixed{

    constructor(){
        this.adContainer = $('.container-adv');
    }

    // --- Create Sticky Element 
    // 1 - Cria elemento fantasma para ficar no lugar da publicidade fixa

    createStickyElement(){
        let stickyElement = document.createElement('div');
        stickyElement.className = 'sticky-element';  
        this.adContainer
            .parentNode.insertBefore(stickyElement, this.adContainer); 
    }

    // --- Scroll
    // 1 - Coloca envent no scroll
    // 2 - Verifica a posição onde estamos ao scrollar
    // 3 - Verifica posição do elemento fantasma que se refere a publicidade
    //     Menos 60px que é o respiro superior 
    // 4 - Chama a função de timer passando as posições acima
    // 5 - Verifica as posiçoes acima, se a nossa posicao atual
    //     for maior ou igual onde a publicidade se encontra,
    //     nós fixamos a publicidade chamando a função fix
    // 6 - Senão for maior, chamamos a funcao que faz o unfix
    // 7 - Além de chamar a função que reseta o timer,
    //     passando o mesmo por parâmetro

    scroll(){
        var timer;

        window.addEventListener('scroll', () => { 
            var wPosition = window.scrollY;
            var adPosition = $('.sticky-element').offsetTop - 60;    
 
            timer = this.startTimer(wPosition,adPosition, timer);  
           
            if(wPosition >= adPosition){
                this.fix();   
            }else{ 
                this.unfix();
                this.cleanTimer(timer);  
            }
        }); 
    }

    // --- Start Timer
    // 1 - Verifica se a publicidade tem a classe de timer
    // 2 - Se não tiver adiciona a classe timer
    //      A classe timer serve para indicar que a publicidade
    //      está sobre o efeito do contador
    // 3 - Retorna e inicia o contador
    // 4 - Se a posição não for a do topo esconde a publicidade após o tempo

    startTimer(wPosition, adPosition, timer){  
        
        if(!this.adContainer.classList.contains('timer')){
            this.adContainer.classList.add('timer');
            timer = setTimeout( () => {
                if (wPosition >= adPosition ){
                    this.hideAd();  
                }
            }, 6000);
        } 
        return timer;
    }

    // --- Clean Timer
    // 1 - Verifica se o timer existe
    // 2 - Se existir limpar o timer e transforma ele em null

    cleanTimer(timer){
        if (timer) { 
            clearTimeout(timer);
            timer = null;
        }
    }

    // --- Fix
    // 1 - Verifica se não possuia classe de flag que
    //     esconde a publicidade apos o timer
    // 2 - Senao tiver inicia o processo de fixamento da publicidade
    // 3 - Aumentando o tamanho do elemento fantasma
    // 4 - Adicionando a classe animated que ser usada para esconder suave
    // 5 - E a classe de faz com que a publicidade ganhe a posição fixa.

    fix(){
        if(!this.adContainer.classList.contains('ad-hide')){
            this.handleStickySize('max');   
            $('.container-adv').classList.remove('fadeOut'); 
            $('.container-adv').classList.add('animated'); 
            $('.container-adv').classList.add('ad-fixed'); 
        }
    }

     // --- Unfix
     // 1 - Remove as classes de fixamento, de cronometro, e de esconder.
     // 2 - Diminui o tamanho do elemento fantasma

    unfix(){

        var classesToRemove = ['ad-fixed', 'timer', 'ad-hide'];

        this.adContainer.classList.remove(...classesToRemove); 
        this.handleStickySize('min'); 
        
    }

    // --- Handle Sticky
    // 1 - Manipula o tamanho do elemento fantasma de acordo com uma ação
    // 2 - Se max, aumenta, se min, diminui 

    handleStickySize(action) {

        var stickyElement = $('.sticky-element');

        if(action == 'max'){
            var adHeight = this.adContainer.offsetHeight + 21;
            stickyElement.style.height = adHeight + 'px';
        }

        if(action == 'min'){
            stickyElement.style.height = '0px'; 
        }
       
    }

    // --- Hide Ad
    // 1 - Adiciona classe que esconde a publicidade de forma suave
    // 2 - Adiciona classe que serve como flag para indicar
    //     que a publicidade esta escondida
    // 3 - Esconde o elemento de verdade
    // 4 - Remove as classes para fixar e o de timer
    // 5 - Remove as classes de esconder suave e a animated
    // 6 - Diminui o elemento fantasma
    // 7 - Mostra novamente a publicidade

    hideAd(){

        this.adContainer.classList.add('fadeOut');
        this.adContainer.classList.add('ad-hide');    
      

        setTimeout(() => { 

            this.adContainer.style.display = 'none';   
            var classesToRemove = ['ad-fixed', 'timer', 'fadeOut', 'animated'];
            this.adContainer.classList.remove(...classesToRemove);
            this.handleStickySize('min'); 
            this.adContainer.style.display = 'block'; 
            
             
        }, 500);  
        
    }

}


let adFixed = new AdvertsingFixed(); 

adFixed.createStickyElement();
adFixed.scroll();


