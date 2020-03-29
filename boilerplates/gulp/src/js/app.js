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
