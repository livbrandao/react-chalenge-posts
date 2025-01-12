# React Challenge - Gerenciador de Posts

Este projeto é uma aplicação de blog desenvolvida com React, que exibe uma lista de posts e permite a interação com os dados de maneira simples e eficiente.

## **Descrição do Projeto**

Este projeto foi um desafio técnico para avaliar as habilidades de frontend.

O objetivo era criar uma aplicação web funcional e responsiva, utilizando boas práticas de desenvolvimento e ferramentas modernas.

A aplicação consiste em um app de gerenciamento de posts, para auxiliar o usuário a gerenciar suas publicações.

Utilizei a API pública JSONPlaceholder para realizar operações CRUD (Create, Read, Update, Delete) em posts.
Você deve implementar as funcionalidades de listagem, criação, edição e exclusão de posts.

O objetivo principal do projeto é fornecer uma interface intuitiva para visualizar e pesquisar posts, simulando o ambiente de um blog. A aplicação utiliza componentes React, consumo de APIs simuladas e uma abordagem modular para organização do código.

## **Funcionalidades**

- Listagem de posts com título, conteúdo e metadados.
- Barra de busca para localizar posts por título.
- Interface responsiva para uma experiência otimizada em diferentes dispositivos.

## Estrutura final

```
src/
│
├── components/
│   ├── PostForm.jsx # Formulário para criar/editar posts
│   ├── PostList.jsx # Lista de posts
│   ├── PostItem.jsx # Componente para exibir um post individual
│   └── SearchFilter.jsx # Componente para filtrar posts
│
├── services/
│   └── api.js # Configuração da API
│
├── styles/
│   └── global.css # Estilos globais
│
├── App.jsx # Componente principal
│
└── main.jsx # Ponto de entrada da aplicação
```

## Tarefas Realizas

- ✅ **Consumir API**: Implementado a lógica para consumir a API JSONPlaceholder e disponibilizado as seguintes funcionalidades:
  - Listar posts
  - Criar post
  - Editar post
  - Excluir post
- ✅ **Validações**: Validações ao formulário de criação/edição de posts
- ✅ **Feedback visual**: Feedback visual ao usuário:
  - Loading spinner
  - Mensagens de erro/sucesso
- ✅ **Responsividade**: Aplicação responsiva
- ✅ **Gerenciamento de Requisições**: Utiliza React Query para gerenciar as requisições à API
- ✅ **Paginação**: Funcionalidade de paginação
- ✅ **Pesquisa**: Funcionalidade de pesquisa por título
- ✅ **TypeScript**: Utilizar TypeScript para adicionar tipagem ao código

## **Tecnologias Utilizadas**

- **React**: Biblioteca principal para construção da interface.
- **Axios**: Biblioteca para realizar requisições HTTP.
- **React Router**: Para gerenciamento de rotas e navegação.
- **TailwindCSS**: Estilização dos componentes da aplicação.

## **Pré-requisitos**

Antes de começar, você precisará ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)

## **Instalação**

1. Clone o repositório para a sua máquina local:

   ```bash
   git clone https://github.com/livbrandao/react-chalenge-posts.git
   ´´´

   ```

2. Acesse o diretório do projeto:

   ```bash
   Copiar código
   cd react-chalenge-posts
   ´´´

   ```

3. Instale as dependências:

   ```bash
   npm install
   ´´´

   ```

4. Inicie a aplicação:
   ```bash
   npm start
   ´´´
   ```

## Possíveis Melhorias

- Integração com uma API real para fornecer dados dinâmicos.
- Adicionar autenticação para permitir ações como curtir e comentar em posts.
- Implementar testes automatizados para garantir a estabilidade do código.
- Melhorar a acessibilidade com boas práticas de ARIA.

##

Desenvolvido com ❤️ por Livia Brandao.
