## Sistema de CRUD em Flask

Foi feito o curso de Flask onde foi criado um crud de jogos. A ideia agora é criar um crud de posts de matéria para garantir o conhecimento.

#### O que precisa ser feito ?

É preciso criar a estrutura da aplicação.
A estrutura se baseia em:

**Views:**

- View de home - Listagem - **OK**
- View de cadastro de post - Cadastro  **OK**
- View de edição do post **OK**
- Views de Login **OK**

**Routes/Endpoints:**

- Rota da view index - GET **OK**
- Rota da view de cadastro - GET **OK**
- Rota da view de edição - GET - com parametro **OK**
- Rota de Views de Login **OK**
- Rota do cadastro - POST **OK**
- Rota de edição/atualização - POST com id hidden **OK**
- Rota de exclusão - POST com id hidden - com parametro **OK**
- Rota de Autenticação de Login - POST **OK**
- Rota de Logout - GET **OK**
- ROta de upload de imagem - GET **OK**

**Models:**

- Post **OK**
- Usuário **OK**

**Banco**

- Criar migrate **OK**
- Database - Ambiente **OK**
- Table - Posts (id, title, category, description) **OK**
- Table - User (id, name, password) **OK**

**Data Access Object - DAO**

- Class de Post **OK**
- Consulta de salvar post **OK**
- Consulta de listar post **OK**
- Consulta de buscar post por id **OK**
- Consulta de deletar post **OK**
- Class de usuário **OK**
- Consulta de buscar usuario por id **OK**

**Helpers**

- Helpers a definir

**Config**

- SECRET_KEY **OK**
- MYSQL_HOST **OK**
- MYSQL_USER **OK**
- MYSQL_PASSWORD **OK**
- MYSQL_DB **OK**
- MYSQL_PORT **OK**
- UPLOAD_PATH **OK**


**Estáticos**

- styles **OK**
- scripts **OK**
- images **OK**
