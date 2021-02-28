# 🌐 Net Promoter Score

## 📝 Sobre o projeto

API desenvolvida durante a Next Level Week 4 (NLW),
pela [Rocketseat](https://rocketseat.com.br/), em
fevereiro de 2021.

Escolhi a trilha de Node.js porque estou estudando
back-end, atualmente e os conhecimentos adquiridos
na NLW complementaram os meus estudos.

Esta é uma aplicação desenvolvida apenas para fins
de aprendizado.

### ❓ O que é Net Promoter Score?

O Net Promoter Score (ou NPS) é uma métrica para
medir a satisfação dos clientes, fazendo um cálculo
de notas relacionadas à pergunta: "De 0 a 10, o
quanto você recomendaria nossa empresa?".

As notas têm uma classificação, que são levadas em consideração,
neste cálculo:

| Nota | Classificação |
| ---- | ----- |
De 0 a 6 | Detrator
De 7 a 8 | Passivo
De 9 a 10 | Promotor

As notas da classificação não são levadas em conta,
no cálculo de NPS.

A fórmula para calcular o NPS é a seguinte:

<code>(Promotor - Detrator) / Total de Avaliações</code>

<hr />

Através desta aplicação, é possível fazer o cadastro
de usuário (que seria um cliente), criar uma pesquisa,
listar as pesquisas, fazer o envio de emails para
que os clientes enviem sua nota e fazer o cálculo 
de NPS.

## 💻 Endpoints

### 🧍 Usuários

<b> POST <code>/users</code> </b> Criação de usuários

Este endpoint precisa receber um nome e um email no
corpo da requisição.

```node
// Corpo da requisição
{
    name: "Débora",
    email: "debora@gmail.com"
}
```

```node
// Retorno
{
    id: "39a3a2c9-1c33-415f-9ed0-3c8d6c3ba9f5",
    name: "Débora",
    email: "debora@gmail.com",
    created_at: "2021-02-28T19:36:15.000Z"
}
```



### 🔎 Pesquisas

<b> GET <code>/surveys</code></b> Listar todas as pesquisas criadas

```node
// Retorno
[
  {
    id: "c6d8506b-9881-43d6-9024-62ed21978fc0",
    title: "Rocketseat",
    description: "De 0 a 10, o quanto você recomendaria a Rocketseat?",
    created_at: "2021-02-26T03:13:49.000Z"
  },
  {
    id: "1f7f097c-5906-421e-8c3f-477798468e6b",
    title: "Empresa X",
    description: "De 0 a 10, o quanto você recomenda a Empresa X?",
    created_at: "2021-02-26T03:17:27.000Z"
  }
]
```

<b>POST <code>/surveys</code></b> Criar uma nova pesquisa

Este endpoint precisa receber um título e uma descrição.

```node
// Corpo da requisição
{
    title: "Empresa X",
    description: "De 0 a 10, o quanto você recomenda a Empresa X?"
}
```

```node
// Retorno
{
    id: "1f7f097c-5906-421e-8c3f-477798468e6b",
    title: "Empresa X",
    description: "De 0 a 10, o quanto você recomenda a Empresa X?",
    created_at: "2021-02-26T03:17:27.000Z"
  }
```

### ✉️ Envio de Email

<b>POST <code>/sendMail</code></b> Envio de email contendo link para avaliação de empresa

Necessário conter um email válido e o id de uma pesquisa. 

```node
// Corpo da requisição
{
    email: "debora@gmail.com",
    survey_id: "1f7f097c-5906-421e-8c3f-477798468e6b"
}	
```

Caso o usuário esteja recebendo o email pela primeira vez,
o retorno será o seguinte:

```node
{
  id: "7df04a6a-fac6-443a-9249-c77363b42656",
  user_id: "39a3a2c9-1c33-415f-9ed0-3c8d6c3ba9f5",
  survey_id: "1f7f097c-5906-421e-8c3f-477798468e6b",
  created_at: "2021-02-28T19:44:14.000Z"
}
```

Caso já tenha recebido o email, mas ainda não tenha avaliado, será o seguinte:

```node
{
  id: "7df04a6a-fac6-443a-9249-c77363b42656",
  user_id: "39a3a2c9-1c33-415f-9ed0-3c8d6c3ba9f5",
  survey_id: "1f7f097c-5906-421e-8c3f-477798468e6b",
  value: null,
  created_at: "2021-02-28T19:44:14.000Z",
  user: {
    id: "39a3a2c9-1c33-415f-9ed0-3c8d6c3ba9f5",
    name: "Débora",
    email: "debora@gmail.com",
    created_at: "2021-02-28T19:36:15.000Z"
  },
  survey: {
    id: "1f7f097c-5906-421e-8c3f-477798468e6b",
    title: "Empresa X",
    description: "De 0 a 10, o quanto você recomenda a Empresa X?",
    created_at: "2021-02-26T03:17:27.000Z"
  }
}
```

### 🖩 Cálculo de NPS

<b>GET <code>/nps/:id_da_pesquisa</code></b> Cáculo de NPS, com base em avaliações de uma pesquisa

Para este endpoint, é necessário passar o id de uma pesquisa, na rota.

```node
// Retorno
{
  detractors: 2,
  promoters: 4,
  passives: 0,
  totalAnswers: 6,
  nps: 33.33
}
```

## 💿 Instalação

Para instalar este repositório, é necessário baixá-lo.

```bash
git clone https://github.com/deboralbarros/nlw4.git
```

Depois, basta entrar na pasta do projeto e instalar as dependências:

```node
cd nlw4

// instalando com yarn
yarn

// instalando com npm
npm install
```

Então, depois de instaladas as dependências, é necessário rodar as migrations:

```node
// com yarn
yarn typeorm migration:run

// com npm
npm run typeorm migration:run
```

Antes de rodar, é necessário criar um arquivo <code>.env</code> na raiz do projeto para que
a funcionalidade de avaliação funcione. Dentro deste arquivo, coloque:
```angular2html
URL_MAIL=http://localhost:3333/answers
```

E agora, para rodar, basta dar <code>yarn dev</code> que a aplicação estará rodando em [localhost:3333](http://localhost:3333).

## ⚙️ Tecnologias Utilizadas

* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/pt-br/)
* [Typescript](https://www.typescriptlang.org/)
* [SQLite](https://www.sqlite.org/index.html)
* [TypeORM](https://typeorm.io/#/)
* [Nodemailer](https://nodemailer.com/about/)
* [Ethereal](https://ethereal.email/) 
* [Yup](https://github.com/jquense/yup)
* [Jest](https://jestjs.io/)
* [Handlebars](https://handlebarsjs.com/)