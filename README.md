# Gerenciador de notícias
Aplicação de back-end para gerenciamento de notícias.

## Como funciona?
Este projeto é uma API REST para atender a aplicação de notícias rápidas. Ela possui apenas uma entidade: `news`. Para entidade, foram criados cinco rotas:

- GET `/news` — Lista todas as notícias
- GET `/news/:id` — Busca uma notícia específica
- POST `/news` — Cria uma nova notícia
- PUT `/news/:id` — Atualiza uma notícia existente
- DELETE `/news/:id` — Remove uma notícia

As rotas seguem as convenções de respostas para APIs REST.

## Tecnologias utilizadas
Para este projeto, foram utilizadas:

- Node
- Express
- Typescript
- Prisma
- Postgres
- Jest e Supertest

## 🎯 Objetivo do Projeto

Praticar:
- refatoração de código legado
- separação de responsabilidades
- padronização de camadas
- escrita de código limpo e testável
