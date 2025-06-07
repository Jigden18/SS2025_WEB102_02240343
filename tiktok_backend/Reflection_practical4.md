
# Practical 4: Connecting TikTok to PostgreSQL with Prisma ORM


## Introduction

In this practical, we connected our TikTok clone backend to a PostgreSQL database using **Prisma ORM**. This marked a significant shift from in-memory data storage to **persistent and structured data storage**, enabling real-world scalability and reliability. We also integrated secure user authentication using **bcrypt** for password hashing and **JWT** for stateless login sessions.

---

## What I Learned

- **PostgreSQL Setup**: I learned how to create and configure a PostgreSQL database and user via the terminal.
- **Prisma ORM Integration**: I gained hands-on experience initializing Prisma, defining a schema, running migrations, and generating the client for querying the database.
- **Database Schema Design**: I better understood how to model relationships such as one-to-many (user → videos) and many-to-many (likes, follows).
- **Authentication**: Implementing password hashing and JWT-based authentication taught me important security practices for web applications.
- **Seeding Data**: I learned how to generate realistic dummy data using a custom seed script to simulate a working application environment.

---

## Challenges Faced

- **Migration Errors**: Initially, I faced issues with Prisma migrations due to misconfigured schema relationships.
- **JWT Token Handling**: Integrating middleware to protect routes required careful setup to ensure the token was verified correctly.
- **Complex Queries**: Structuring Prisma queries with nested includes and transactions was new and took some trial and error.

---

## Key Takeaways

- ORM tools like **Prisma** significantly reduce SQL boilerplate and help enforce consistency between the database and codebase.
- Authentication must always be implemented securely, even in development projects.
- Writing and running **seed scripts** is a useful skill for testing and demoing full-stack apps.

---

## How This Builds on Previous Practicals

This practical extends the RESTful API built in earlier stages by connecting it to a real database. It reinforces concepts such as modular backend structure, routing, and now introduces persistent data storage and secure authentication.

---

## What I Would Do Differently

If I repeated this task, I would:
- Define the Prisma schema **early** to avoid multiple revisions during migration.
- Use environment variables more securely and consistently.
- Add test coverage for authentication flows and protected routes.

---

## Conclusion

This practical has made my TikTok clone project feel like a **real-world full stack application**. By incorporating a persistent database, proper authentication, and ORM-based querying, I now feel more confident in building scalable, secure backends using **PostgreSQL and Prisma**.
