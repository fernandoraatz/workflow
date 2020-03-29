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
