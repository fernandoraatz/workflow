/*
|--------------------------------------------------------------------------
| Custom Scripts
|--------------------------------------------------------------------------
*/

// Defining querySelector alias

// let $ = document.querySelector.bind(document);

// Messenger

class Messenger {

  constructor(){
      this.showMessage();
  }

  showMessage(){

      $('form input[type="file"]').on('change', function(){
        let arquivos = event.target.files;
        if (arquivos.length === 0) {
          console.log('sem imagem pra mostrar')
        } else {
            if(arquivos[0].type == 'image/jpeg') {
              $('img').remove();
              let imagem = $('<img class="img-responsive">');
              imagem.attr('src', window.URL.createObjectURL(arquivos[0]));
              $('figure').prepend(imagem);
            } else {
              alert('Formato não suportado')
            }
        }
      })
        
      
  }


}

// Iniciando Classe

let messengerController = new Messenger();
