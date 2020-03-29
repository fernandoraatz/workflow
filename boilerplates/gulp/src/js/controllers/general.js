/*
|--------------------------------------------------------------------------
| Controller General
|--------------------------------------------------------------------------
*/

APP.controller.General = {

    init: function (){

        this.constructor();
        this.showMessage();

    },

    constructor : function (){

        this.title = $('.header-title');

    },

    showMessage: function(){

        var title = this.title.innerText;
        var text = "Você está na página: " + title + ".";

        console.log(text);

    }

};
