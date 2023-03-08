### Hi there! 👋

## Application Overview

This is a full-stack application built using ReactJS and TypeScript for the frontend, and Node.js with PostgreSQL for the backend. The application allows registered users to transfer money from their wallets to other registered users in the database.

The frontend of the application is styled using Tailwind CSS and includes features such as user authentication and input validation. When a user signs up, their username and password are stored securely in the PostgreSQL database using Sequelize as the ORM.

Once logged in, a user can view their current wallet balance, as well as their transaction history. Transactions can be filtered by type (incoming or outgoing) and by date range.

To transfer money to another user, the user must input the recipient's username and the amount they wish to transfer. If the transfer is successful, both the sender's and recipient's wallet balances will be updated in the database and the transaction will be added to their respective transaction histories.

The backend of the application is containerized using Docker, making it easy to deploy and run in any environment. Eslint is used for code linting, ensuring code quality and consistency throughout the application. 


## What is inside?
- [ReactJS](https://reactjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind Css](https://tailwindcss.com/)
- [Eslint](https://eslint.org)
- [Docker](https://www.docker.com)
- [postgre](https://www.postgresql.org/)
- [sequelize](https://sequelize.org/)

## Getting Started

```bash
git clone git@github.com:LucasOAssuncao/Project-NG.git
```

```bash
cd Project-NG
```

### Install dependencies:

#### With Docker:

```bash
docker-compose up --build -d
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to use

###  You will need to click in "sign up" at home page.

###  "username" will require at least 3 characters.

###  "password" will require at least 8 characters, at least 1 uppercase, and 1 number.

###  After you signed you will be redirected to /login, i recommend you to create another account for full test of the aplication.

###  After login in one of your accounts created, you now can transfer "money" to another account registered in the database, and you can filter your in or out transactions, using or not the date on which the transfer was created .
