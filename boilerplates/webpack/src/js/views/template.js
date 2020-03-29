/*
|--------------------------------------------------------------------------
| Template
|--------------------------------------------------------------------------
*/

export class Template { 

    constructor(container){
        this._container = document.querySelector('.page-content'); 
    }

    // Template Model

    templateModel(model){

        return `<div>
                      <p>${model}</p>
                       </div>`; 
        
    }

    // Refresh and update View

    refresh(model) {
        this._container.innerHTML = this.templateModel(model); 
    }

}
