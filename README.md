# <p align = "center"> Project 19 - DrivenPass </p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-Icaro Pavani-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/Icaro-pavani/projeto19-drivenpass?color=4dae71&style=flat-square" />
</p>

## :clipboard: Description

DrivenPass is an REST API that store confidential information such as username and passwords, cards infos and importants notation. This way, it is possible to store safely these informations and access them with only one single combination of username and password.

---

## :computer: Technologies and concepts

- REST APIs
- JWTs
- Node.js
- TypeScript
- PostgreSQL
- Prisma

---

## :rocket: Routes

```yml
POST /sign-up
    - Route to registry a new user
    - headers: {}
    - body: {
        "email": "lorem@gmail.com",
        "senha": "loremipsum"
    }
```

```yml
POST /login
    - Route to login
    - headers: {}
    - body: {
        "email": "lorem@gmail.com",
        "senha": "loremipsum"
    }
```

```yml
POST /credentials/create (authenticated)
    - Route to create a new crendential
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "title": "loremipsum",
        "url": "https://www.loremipsum.com",
        "username": "lorem@gmail.com",
        "password": "loremipsumlor"  //min 10 character
    }
```

```yml
GET /credentials (authenticated)
    - Route to list all credentials of the user
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
GET /credentials/get/:id (authenticated)
    - Route to get one specific user's credential by id
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
DELETE /credentials/delete/:id (authenticated)
    - Route to delete one credential by id
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
POST /notes/create (authenticated)
    - Route to create a new note
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "title": "loremipsum",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla urna massa, mollis id facilisis ut, tristique convallis dolor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;"
    }
```

```yml
GET /notes (authenticated)
    - Route to list all notes of the user
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
GET /notes/get/:id (authenticated)
    - Route to get one specific user's note by id
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
DELETE /notes/delete/:id (authenticated)
    - Route to delete one note by id
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
POST /cards/create (authenticated)
    - Route to create a new card
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "title": "loremipsum",
        "cardNumber": "4450 5565 4856 4443",
        "cardholderName": "Fulano N Passos",
        "CVV": "456",
        "expirationDate": "04/29",
        "password": "1122",
        "isVirtual": false,
        "type": "credit"  // type = "credit" || "debit" || "both
    }
```

```yml
GET /cards (authenticated)
    - Route to list all cards of the user
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
GET /cards/get/:id (authenticated)
    - Route to get one specific user's card by id
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
DELETE /cards/delete/:id (authenticated)
    - Route to delete one card by id
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
POST /wifis/create (authenticated)
    - Route to create a new wi-fi password
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "title": "loremipsum",
        "wifiName": "loremipsum",
        "password": "loremipsum1871"
    }
```

```yml
GET /wifis (authenticated)
    - Route to list all wi-fis passwords of the user
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
GET /wifis/get/:id (authenticated)
    - Route to get one specific user's wi-fi password by id
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
DELETE /wifis/delete/:id (authenticated)
    - Route to delete one wi-fi password by id
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
POST /documents/create (authenticated)
    - Route to create a new document
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "title": "loremipsum",
        "type": "RG",  // type = "RG" || "CNH" *
        "fullName": "Fulano Narques Passos",
        "expeditionDate": "01/04/20",
        "expirationDate": "30/04/29",
        "docNumber": "273817939",
        "issuer": "Ipsumlorem",
    }
```

\* RG is the brazilian national identity card/ CNH is the brazilian driver's license

```yml
GET /documents (authenticated)
    - Route to list all documents of the user
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
GET /documents/get/:id (authenticated)
    - Route to get one specific user's document by id
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
DELETE /documents/delete/:id (authenticated)
    - Route to delete one document by id
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

---

## 🏁 Running the application

This project was created using TypeScript, [Node.js](https://nodejs.org/en/download/) and [PostgresSQL](https://www.postgresql.org/) as database. So, make sure do you have the last version of [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/) running localy.

Start cloning this repository in you local machine:

```
git clone https://github.com/Icaro-pavani/projeto19-drivenpass
```

After that, inside the cloned folder, run the command below to install the project dependencies.

```
npm install
```

At last, just need to start the server with the command:

```
npm start
```

:stop_sign: Don't forget to follow the same steps showed above in the [front-end](https://github.com/Icaro-pavani/projeto19-drivenpass/tree/main/front-end), which contains the webpage application for this API. Thus, you can test the role project.

## Deploy

The link of the deployed API is [https://ipt-drivenpass.herokuapp.com/](https://ipt-drivenpass.herokuapp.com/)
