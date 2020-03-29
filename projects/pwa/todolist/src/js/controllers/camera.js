/*
|--------------------------------------------------------------------------
| Model Camera
|--------------------------------------------------------------------------
*/

// Bind $

let $ = document.querySelector.bind(document);

// Camera

import { Camera } from '../helpers/camera';
import { ModalCard } from './card';

// Instantiate

let camera = new Camera();
let modalCard = new ModalCard();

// Class ModalCamera

export class ModalCamera{

    constructor(){
        this.modal = $('#camera-dialog')
    }

    open(){
        var modal_box = this.modal;
        modal_box.querySelector('.close').addEventListener('click', this.close);
        modal_box.showModal();
        camera.start();
    }

    close(){
        var btn_close = this;
        $('#camera-dialog').close();
        camera.stop();
    }

    shoot(){
        var image = camera.shoot();
        if(image){
            modalCard.getElements().img.src = image;
            this.close();
        }
    }

    changeSource(){
        camera.changeSource();
    }


}
