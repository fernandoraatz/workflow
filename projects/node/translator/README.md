# Leibniz

Tradutor de conteúdos produzidos pelo Globocore para o modelo de dados do repositório central.

---

## Sumário

* [Tecnologia](#tecnologia)
* [Instalação com Docker](#com-docker)
* [Utilização do serviço](#utilização-do-serviço)
* [Testes](#testes)
* [Debug VsCode](#debug-vscode)
* [Guia de Estilos](#guia-de-estilos)
* [Fluxo de Desenvolvimento](#fluxo-de-desenvolvimento)
* [Ambiente](#ambiente)

---

## Tecnologia

Aplicação:
*   [Node 7.x](https://nodejs.org)
*   [Express](http://expressjs.com/)  

Suíte de Testes  
*   [Mocha](https://mochajs.org/)  
*   [Chai](http://chaijs.com/)

---

## Instalação

Para utilizar esse projeto com o Docker baixe o projeto [Symposium](https://github.com/Infoglobo/symposium)

Consulte:
* A [documentação oficial](https://docs.docker.com/get-started/) do Docker
* [O guia de Docker](https://github.com/Infoglobo/Documentacoes/blob/master/novas-plataformas/Docker.md) da Editora/Infoglobo
* A seção sobre [Troubleshooting](#docker-troubleshooting)

Você deve possuir acesso no repositório de imagens reg.igeg.com.br - caso não tenha entre em contato com a equipe de Performance

**Buildar a imagem:**

Rodar comando na raiz do projeto:

```
docker-compose up --build

```

---


## Utilização do serviço

Endpoint que traduz JSON vindo do Globocore:

```
curl -H "Content-Type: application/json" -X POST -d @mock.json http://localhost:4000/translate/json

```

Endpoint de healthcheck:

```
curl -H "Content-Type: application/json" http://localhost:4000/healthcheck.json

```

---

## Testes


Rodar testes manualmente:

```
npm test
```

Rodar coverage manualmente:

```
npm run coverage
```

---

## Debug Vscode

Inserir configurações de debug no launch.json.

Configuração de Debug:

```
{
     "type": "node",
     "request": "attach",
     "name": "Docker: Attach to Node",
     "port": 9229,
     "address": "127.0.0.1",
     "localRoot": "${workspaceFolder}/",
     "remoteRoot": "/leibniz",
     "protocol": "inspector"
}

```

Configuração de Debug de testes:

```
{
   "type": "node",
   "request": "launch",
   "name": "Mocha Tests",
   "program": "${workspaceFolder}/node_modules/mocha/bin/_mocha",
   "args": [
       "--recursive",
       "--colors",
       "${workspaceFolder}/tests/api/healthcheck.test.js"
       //"${workspaceFolder}/tests"
   ],
   "stopOnEntry": false,
   "runtimeExecutable": null,
   "runtimeVersion": "8.9.3"
}

```


---

## Guia de Estilos

Este projeto segue os padrões de código descritos [neste documento](https://github.com/Infoglobo/Documentacoes/blob/master/novas-plataformas/GuiaDeEstiloDeCodigo.md).

---

## Fluxo de Desenvolvimento

Este projeto tem a branch master protegida contra push. A atualização dessa branch deve ocorrer apenas através de PR com no mínimo um review de aprovação por outro membro da equipe.  

O processo de desenvolvimento (nomes de branches, mensagens de commits, PR's, etc) utilizado está descrito [aqui](https://github.com/Infoglobo/Documentacoes/blob/master/novas-plataformas/git-flow.md).

---

## Ambiente

Fluxo de Publicação

No Globo Core um módulo python utiliza o método post_save do módulo signals do Django que envia para fila que está entre o Globo Core e o Tradutor todo o conteúdo que foi criado ou modificado. Além disso, o módulo possui uma rota para expor o JSON que foi enviado para a fila.

Caso ocorra problemas na comunicação entre a farm e a fila entre o Globo Core e o Tradutor o conteúdo é armazenado no banco de dados e reenviado depois de 5 minutos.

Ao perceber que possui um documento na fila o tradutor recupera o json e realiza a tradução do campo body contido dentro do json, que possui um conteudo html.

Feito a tradução deste campo html para chunks de acordo com o modelo de dados do content hub, o tradutor envia o json final para a fila de publicação do Chapolin.

<p align="center">
<img src="https://github.com/Infoglobo/Documentacoes/blob/master/globocore/tradutor/Leibniz.jpg" width="550px"/>
</p>

---





