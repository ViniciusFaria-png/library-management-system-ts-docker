# 📚 Sistema de Gerenciamento de Biblioteca
![Backend CI](https://github.com/ViniciusFaria-png/library-management-system-ts-docker/actions/workflows/ci.yml/badge.svg)

## 🎯 Objetivo

Desenvolver um sistema de gerenciamento de biblioteca utilizando a **última versão do TypeScript**. O foco será criar um **CRUD (Create, Read, Update, Delete)** que se conecta a um banco de dados, podendo ser **NoSQL ou SQL**.

---

## ✅ Requisitos Funcionais

- **Gerenciamento de Livros**: o sistema deve disponibilizar uma **API** com funcionalidades de um CRUD para que uma aplicação Front-end possa consumir esses dados.
- **Entidade Livro**:
  - Cada livro deve possuir:
    - Título
    - Autor(a)
    - ISBN
    - Ano de publicação
- **Entidade Editora (opcional)**:
  - Um livro pode estar vinculado a uma Editora.
  - Uma Editora pode ter uma lista de livros associados.

---

## 🛠️ Requisitos Técnicos

- Utilização da versão mais recente do **TypeScript**.
- Conexão com um banco de dados, podendo ser:
  - **SQL** (ex: PostgreSQL)
  - **NoSQL** (ex: MongoDB)
- **Sugestão**: utilizar **Docker** ou **Supabase** para facilitar o setup do banco de dados (PostgreSQL gratuito).
- Código deve estar atualizado e organizado.

---
