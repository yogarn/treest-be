# Treest

![image](https://github.com/yogarn/slashcom-2024-be/assets/144443155/187895b6-25dc-4a7d-a5a1-1785bb12fd74)

> [!NOTE]
> This project was created as a submission for Slashcom Hackathon 2024. It marks the beginning of my journey in NestJS development. While it's far from perfect, it was a valuable learning experience and a solid first attempt.

## Description

Investasi bijak, untuk bumi, untuk masa depan: menuju pertumbuhan ekonomi hijau yang berkelanjutan. Treest, terobasan terbaru yang menyediakan informasi terkini seputar perusahaan dan start-up yang bergerak di bidang lingkungan dan siap menerima investasi anda.  

For more information about our API, please visit the documentation page below.  
https://documenter.getpostman.com/view/32730747/2sA3JGf3o3

You can directly access our API by using the link provided below or running it in your local environment (see Running the application section).  
https://treest-be.vercel.app/

For the current development, we already have predefined user account with username `admin` and password `root` for testing purposes. This account capable of creating a new company and access administrator only routes, such as view all users, delete users, delete company, delete news, delete comments, etc.

## Technology
There are several technologies used in this repository:
- NestJS
- Supabase
- Prisma ORM

## Installation

```bash
$ npm install
```

## Database Migrations
Before continuing, make sure to configure your prisma according to your database in .env and in prisma.schema.  

Push prisma.schema to the database  
```bash
$ npx prisma db push
```
Run the prisma seeder (optional)
```bash
$ npx prisma db seed
```
Generate prisma clients
```bash
$ npx prisma generate
```

## Running the app

Before you run the application, make sure to create an .env file in your local development using the template provided in .env.example.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
