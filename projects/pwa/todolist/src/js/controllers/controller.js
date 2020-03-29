/*
|--------------------------------------------------------------------------
| Controller
|--------------------------------------------------------------------------
*/

// Import modules

import { Menu } from './menu';
import { ModalCard } from './card';
import { ModalCamera } from './camera';
 
// Instantiate

let menu = new Menu(); 
let modalCard = new ModalCard();
let modalCamera = new ModalCamera();

// Class Controlller

export class Controller{

    // Coloca evento click no document inteiro 
    // Verifica a classe do elemento e chama um evento especifico de acordo com o seu data-action

    start(){

        document.addEventListener('click', (event) => {

            var eTarget = event.target

            if(eTarget.classList.contains('mdl-button__ripple-container') || eTarget.classList.contains('material-icons')){
                var button = eTarget.parentElement;
                switch(button.dataset['action']){
                    case 'open': modalCard.open(button.dataset['item']); break;
                    case 'close': modalCard.close(); break;
                    case 'check': modalCard.check(button.dataset['item']); break;
                    case 'save': modalCard.save(); break;
                    case 'startCamera': modalCamera.open(); break;
                    case 'stopCamera': modalCamera.close(); break;
                    case 'shoot': modalCamera.shoot(); break;
                    case 'changeSource': modalCamera.changeSource(); break;
                }
            }else if(eTarget.classList.contains('menu-aside-item')){ 
                var button = event.target;
                switch(button.dataset['action']){
                    case 'newItem': menu.newItem(); break;
                    case 'checkAll': menu.checkAll(); break;
                    case 'uncheckAll': menu.uncheckAll(); break;
                    case 'clearAll': menu.clearAll(); break;
                }
            }
        })

    }



}