# Teste JS+

Sistema de cadastro de clientes.
API em Node.js e Cliente em React.

---

## Descrição

- API em Node.js como servidor.  
- Express como middleware.  
- MongoDB como banco
- Nodemon para observar alterações no servidor.     
- Testes unitários e de integração com Jest
- Docker com container das aplicações e do banco
- Client em React
- Sass componetizado
- Estrutura de requisições no Insomnia

---

## Pré-Requisitos

Instalar o Node e seus módulos.  

## Procedimentos

### Instalar Módulos e Rodar com docker

Construir o projeto com docker:

```css
sudo docker-compose up --build
```

Rodar com docker:

```css
sudo docker-compose start
```

## Fazer Requisição

Requisição de Post para popular o banco via Json - na raiz da pasta server.

```css
curl -H "Content-Type: application/json" -X POST -d @resource.json http://localhost:5001/api/clients/

```

Rodar testes na API - na raiz da pasta server.

```css
curl -H "Content-Type: application/json" http://localhost:5001/api/clients/
```

### Insomnia

Na raiz da pasta server existe um arquivo json que pode ser importado no Insomnia para realizar as requisições da API - **insomniaRequests.json**

```css
https://insomnia.rest/download/
```

## Rodar Testes - Jest

Rodar testes na API - na raiz da pasta server.

```css
npm test
```

