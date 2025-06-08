# Secure Backend with Hono, TypeScript, Prisma, and JWT

In this hands-on project, you'll learn how to build a secure RESTful API using **TypeScript**, **Hono framework**, **PostgreSQL**, and **Prisma ORM**. The focus is on implementing **JWT-based authentication** to manage protected resources. You'll set up user registration, login, and secure access to private routes.

---

## Skills You’ll Gain

* Email/password authentication using JWT
* Middleware-based authorization
* Password encryption with Bun’s built-in hashing
* Securing endpoints with JWT tokens
* Using Prisma to handle user and account data efficiently

---

## Requirements

Before you start, make sure you have:

* Basic knowledge of Node.js, REST APIs, TypeScript, and Prisma
* PostgreSQL installed on your system
* Bun (version 1.x or newer)
* (Optional) Prisma extension installed in your code editor (e.g., VS Code)

---

## Getting Started

### 1. Clone the Project

```bash
git clone https://github.com/rubcstswe/web102-hono-auth-jwt-prisma-forked.git
cd web102-hono-auth-jwt-prisma-forked
bun install
```

### 2. Initialize Database with Prisma

Set up your database schema and generate the Prisma client:

```bash
bunx prisma db push
bunx prisma generate
```

---

## Database Schema

```prisma
model User {
  id           String    @id @default(uuid())
  email        String    @unique
  hashPassword String
  Account      Account[]
}

model Account {
  id      String @id @default(uuid())
  userId  String
  user    User   @relation(fields: [userId], references: [id])
  balance Int    @default(0)
}
```

* Each **User** can be linked to multiple **Accounts**
* An **Account** is owned by exactly one **User**

---

## API Routes

### Register (Public Access)

**POST** `/register`

Registers a new user by saving their email and hashed password.

**Example Request:**

```json
{
  "email": "test@gmail.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "message": "User created successfully"
}
```

---

### Login (Public Access)

**POST** `/login`

Validates credentials and returns a signed JWT on success.

**Example Request:**

```json
{
  "email": "test@gmail.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN"
}
```

---

### Access Protected Resource

**GET** `/protected/account/balance`

Retrieves the authenticated user’s account balance.

**Required Header:**

```http
Authorization: Bearer JWT_TOKEN
```

**Response:**

```json
{
  "data": {
    "Account": [
      {
        "balance": 0,
        "id": "75a34064-f8c4-4a7e-90dd-4958c452fbf4"
      }
    ]
  }
}
```

---

## Tech Stack

* **Hono**: Lightweight and performant web server for Bun
* **Prisma**: Type-safe database ORM
* **PostgreSQL**: SQL-based relational database
* **Bun**: Modern runtime and bundler
* **JWT**: JSON Web Token for authentication and authorization

---

## Security Considerations

* Passwords are hashed securely using `Bun.password.hash` (bcrypt)
* JWTs are signed using a secret and set to expire after one hour
* Secure endpoints utilize Hono's JWT middleware
* Keep secrets (like JWT keys) in environment variables, **not in your codebase**

---

## Project Structure

```bash
src/
├── index.ts     # Entry point and route definitions
├── prisma/      # Prisma schema and client setup
├── models/      # (Optional) Custom model logic
.env             # Environment configuration
```

---

## How to Test the API

You can test endpoints using **curl** or tools like **Postman**.

```bash
# Register a new user
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@gmail.com","password":"123456"}'

# Log in to receive a JWT
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@gmail.com","password":"123456"}'

# Access protected route with JWT
curl -X GET http://localhost:3000/protected/account/balance \
  -H "Authorization: Bearer JWT_TOKEN"
```

---

## Summary

In this project, you've implemented:

* Secure user signup and login workflows
* JWT creation and verification
* Password hashing using Bun
* Middleware-based route protection

### Next Steps for Enhancement

* Implement token refresh mechanisms
* Add role-based authorization (admin, user, etc.)
* Integrate email verification on signup

