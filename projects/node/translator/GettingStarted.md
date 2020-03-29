# Tarefa de desenvolvimento do Tradutor em Node:

### Requisitos de instalação e execução local do Node:
* Instalação
 1) Atualize seu sistema:
  * ~$ sudo apt-get update && sudo apt-get -y upgrade
 2) Instalar npm + node:
  * ~$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
  * ~$ sudo apt-get install -y nodejs
  * ~$ sudo apt-get install npm
 3) (Opcional) Versão estável para Ubuntu 16.04:
  * ~$ sudo apt-get update
  * ~$ sudo apt-get install nodejs
 4) Testar instalação:
  * ~$ npm -v
  * ~$ node -v

* Execução de um projeto
 1) Carrega os módulos especificados no package.json
  * ~$ npm install
 2) Executa o serviço - neste caso back-end API
  * ~$ node app

### Requisitos de instalação e uso do depurador no Node:
1) Instalação de pacote global para depuração
 * ~$ sudo npm install -g node-inspector
2) Ativa e mostra a URL do depurador.
 * ~$ node-inspector
3) Rode a aplicação
 * ~$ node --debug app
4) Para visualizar o depurador, copie e cole a URL do node-inspector no navegador.
 * Exemplo: http://localhost:8080/?port=5858
5) Acesse na página do depurador a aba "Sources", veja o código e marque os **breakpoints**.
6) Em outra janela do navegador, navegue para a URL da aplicação.
7) Pacotes instalados no projeto estão no arquivo "package.json". Para listar pacotes globais instalados, use o comando:
 * ~/Workspace/ProjetoEmNode$ npm list -g --depth=0


### Teste Unitário
1) Instalação global do framework de teste "mocha"
 * ~$ sudo npm install mocha -g
2) Instalação do projeto da biblioteca de assertivas de teste "chai"
 * ~/Workspace/ProjetoEmNodeX$ sudo npm install chai --save-dev
3) Executar os testes
 * ~/Workspace/ProjetoEmNodeX$ mocha tests --recursive --watch


### Framework - serviço de fila
Um serviço de fila é usado para gerenciar requisições ao tradutor.

### Qualidade de código
A qualidade do código é monitorada pelo **ESLint**.
Testes unitários são elaborados usando **Mocha** e **Chai**, sendo que o estilo do Chai usado é o *expect*.
