/*
|--------------------------------------------------------------------------
| Core
|--------------------------------------------------------------------------
*/

var APP = {
    core: {},
    component: {},
    controller: {}
};
/*
|--------------------------------------------------------------------------
| Utils
|--------------------------------------------------------------------------
*/

APP.component.Utils = {

    getController: function () {
        return $('meta[name=controller]').getAttribute("content");
    }

};

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

/*
|--------------------------------------------------------------------------
| Controller Index
|--------------------------------------------------------------------------
*/

APP.controller.Index = {

    init: function (){ 

        console.log('Chamando Controller Index');

    },

    constructor : function (){
 
 
    }

};

/*
|--------------------------------------------------------------------------
| Core
|--------------------------------------------------------------------------
*/


var $ = document.querySelector.bind(document);


APP.core.Main = {  

    init: function() { 
        APP.controller.General.init();
        this.loadPageController();
    }, 
 
    loadPageController: function (){

          var controller = APP.component.Utils.getController();

          if (controller) {
              APP.controller[controller].init();
          }
    }

};

// Init App
 
document.addEventListener('DOMContentLoaded', function() {
    APP.core.Main.init();
});
