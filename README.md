# Crowdfunding API - README

**[Live Demo](https://api-crowdfunding.vercel.app/)**

Este é o README detalhado para a API Crowdfunding, um projeto que gerencia problemas e soluções, permitindo aos usuários criar, visualizar, atualizar e excluir problemas, além de comentar e votar em soluções propostas.

Basedado no figma:
https://www.figma.com/file/IY3csTLLxipatx95wsXr3d/T%C3%A9los-Crowdsourcing?node-id=6%3A10239&mode=dev

## Rotas

### Endpoints Públicos

#### 1. Registro de Usuário

- **Rota:** `POST /register`
- **Middleware de Validação:** `inputValidation(createUserSchema)`
- **Controlador:** `createUser`

#### 2. Login

- **Rota:** `POST /login`
- **Middleware de Validação:** `inputValidation(loginSchema)`
- **Controlador:** `login`

#### 3. Atualização de Senha

- **Rota:** `POST /updatepassword/:id`
- **Middleware de Validação:** `inputValidation(loginSchema)`
- **Controlador:** `updatePassword`

### Endpoints Protegidos por Token

As rotas abaixo requerem autenticação por token.

#### 1. Criação de Problema

- **Rota:** `POST /`
- **Middleware de Validação:** `inputValidation(createProblemSchema)`
- **Controlador:** `createProblem`

#### 2. Listagem de Problemas

- **Rota:** `GET /`
- **Controlador:** `getProblems`

#### 3. Detalhes de um Problema

- **Rota:** `GET /:id`
- **Controlador:** `getProblem`

#### 4. Soluções de um Problema

- **Rota:** `GET /:id/solutions`
- **Controlador:** `getProblemSolutions`

#### 5. Atualização de Problema

- **Rota:** `PUT /:id`
- **Middleware de Validação:** `inputValidation(updateProblemSchema)`
- **Controlador:** `updateProblem`

#### 6. Exclusão de Problema

- **Rota:** `DELETE /:id`
- **Controlador:** `deleteProblem`

#### 7. Comentário em um Problema

- **Rota:** `POST /:id/comment`
- **Controlador:** `postComment`

#### 8. Exclusão de Comentário

- **Rota:** `DELETE /:id/comment/:id_comment`
- **Controlador:** `deleteComment`

#### 9. Voto em uma Solução

- **Rota:** `POST /solution/:id/vote`
- **Controlador:** `createVote`

#### 10. Criação de Solução

- **Rota:** `POST /solution/:problem_id`
- **Middleware de Validação:** `inputValidation(createSolutionSchema)`
- **Controlador:** `createSolution`

#### 11. Detalhes de uma Solução

- **Rota:** `GET /solution/:id`
- **Controlador:** `getSolution`

#### 12. Atualização de Solução

- **Rota:** `PUT /solution/:id`
- **Middleware de Validação:** `inputValidation(updateSolutionSchema)`
- **Controlador:** `updateSolution`

#### 13. Exclusão de Solução

- **Rota:** `DELETE /solution/:id`
- **Controlador:** `deleteSolution`

## Deploy

Este projeto está deployado na Vercel e pode ser acessado através do seguinte link: [API Crowdfunding](https://api-crowdfunding.vercel.app/).

## Banco de Dados

O banco de dados utilizado por esta API também está deployado na Vercel, utilizando o PostgreSQL.

## Contribuição

Sinta-se à vontade para contribuir com melhorias ou correções. Abra um problema (issue) para discutir grandes alterações antes de enviar um pull request.

## Tecnologias Utilizadas

![Node.js](https://img.shields.io/badge/-Node.js-43853D?logo=node.js&logoColor=white&style=flat)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black&style=flat)
![Express.js](https://img.shields.io/badge/-Express.js-000000?logo=express&logoColor=white&style=flat)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?logo=postgresql&logoColor=white&style=flat)
