# Sistema Gerencial Txai - API RESTful

## Funcionalidades

- **Autenticação**: Endpoint para login e geração de token JWT.
- **Gerenciamento de Produtos**:
  - Cadastro, edição, listagem e exclusão de produtos.
  - Controle de acesso para que os usuários vejam apenas os produtos que cadastraram.
- **Gerenciamento de Usuários**:
  - Cadastro, edição, listagem e exclusão de usuários.
  - Apenas administradores podem acessar as rotas de gerenciamento de usuários.
- **Proteção de Rotas**: Rotas protegidas por autenticação JWT e controle de acesso baseado em roles.
- **Documentação**: Documentação dos endpoints e valores esperados.

## Requisitos Técnicos

- **Framework**: Desenvolvido utilizando NestJS com Prisma ORM.
- **Testes**: Implementação de testes utilizando JEST.
- **Tratamento de Erros**: Respostas com códigos de status HTTP apropriados e mensagens de erro claras.


## Endpoints

### Autenticação

- **POST /auth**
  - Gera um token JWT para autenticação.
  - Payload:
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```

### Usuários

- **POST /users**
  - Cria um novo usuário.
  - Payload:
    ```json
    {
      "name": "string",
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```

- **GET /users**
  - Lista todos os usuários (somente para administradores).
  - Headers:
    ```json
    {
      "Authorization": "Bearer {{authToken}}"
    }
    ```

- **GET /users/:username**
  - Obtém detalhes de um usuário pelo nome de usuário.
  - Headers:
    ```json
    {
      "Authorization": "Bearer {{authToken}}"
    }
    ```

- **GET /user/:id**
  - Obtém detalhes de um usuário pelo ID.
  - Headers:
    ```json
    {
      "Authorization": "Bearer {{authToken}}"
    }
    ```

- **PUT /users/:id**
  - Atualiza as informações de um usuário.
  - Headers:
    ```json
    {
      "Authorization": "Bearer {{authToken}}"
    }
    ```
  - Payload:
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string",
      "username": "string"
    }
    ```

- **DELETE /users/:id**
  - Deleta um usuário.
  - Headers:
    ```json
    {
      "Authorization": "Bearer {{authToken}}"
    }
    ```

### Produtos

- **POST /products**
  - Cria um novo produto.
  - Headers:
    ```json
    {
      "Authorization": "Bearer {{authToken}}"
    }
    ```
  - Payload:
    ```json
    {
      "name": "string",
      "quantity": "number",
      "value": "number"
    }
    ```

- **GET /products**
  - Lista todos os produtos do usuário logado.
  - Headers:
    ```json
    {
      "Authorization": "Bearer {{authToken}}"
    }
    ```

- **GET /products/:id**
  - Obtém detalhes de um produto pelo ID.
  - Headers:
    ```json
    {
      "Authorization": "Bearer {{authToken}}"
    }
    ```

- **PUT /products/:id**
  - Atualiza as informações de um produto.
  - Headers:
    ```json
    {
      "Authorization": "Bearer {{authToken}}"
    }
    ```
  - Payload:
    ```json
    {
      "name": "string",
      "quantity": "number",
      "value": "number"
    }
    ```

- **DELETE /products/:id**
  - Deleta um produto.
  - Headers:
    ```json
    {
      "Authorization": "Bearer {{authToken}}"
    }
    ```

## Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/pedrodecf/txai-desafio-backend.git
   cd txai-desafio-backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```
  
3. Inicie o docker:
    ```bash
    docker compose up -d
    ```

4. Configure as variáveis de ambiente no arquivo `.env`.

5. Execute as migrações do Prisma:
   ```bash
   npx prisma migrate dev
   ```

6. Inicie a aplicação:
   ```bash
   npm run start:dev
   ```

6. Acesse a documentação das rotas no arquivo `client.http`.

## Testes

- Para executar os testes unitários:
  ```bash
  npm run test
  ```
