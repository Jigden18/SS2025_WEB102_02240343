Here’s a professional `README.md` combining all key steps and concepts from the three practicals you uploaded:

---

# TikTok Clone – Full Stack Implementation Guide

This repository contains the complete backend and frontend setup for a TikTok-style application. It includes RESTful API design, PostgreSQL database integration with Prisma ORM, and cloud storage integration using Supabase.

---

## Practical Breakdown

### Practical 2: REST API Design & Implementation

We build a RESTful backend using **Express.js** to power the TikTok clone’s main functionalities.

#### API Resources:

* Videos
* Users
* Comments

#### Endpoints Structure:

| Endpoint                   | GET              | POST             | PUT      | DELETE     |
| -------------------------- | ---------------- | ---------------- | -------- | ---------- |
| `/api/videos`              | ✔ Get all videos | ✔ Create video   | -        | -          |
| `/api/videos/:id`          | ✔ Get by ID      | -                | ✔ Update | ✔ Delete   |
| `/api/videos/:id/comments` | ✔                | -                | -        | -          |
| `/api/users`               | ✔ Get all users  | ✔ Create user    | -        | -          |
| `/api/users/:id`           | ✔ Get by ID      | -                | ✔ Update | ✔ Delete   |
| `/api/users/:id/videos`    | ✔                | -                | -        | -          |
| `/api/users/:id/followers` | ✔                | ✔ Follow         | -        | ✔ Unfollow |
| `/api/comments`            | ✔                | ✔ Create comment | -        | -          |
| `/api/comments/:id`        | ✔                | -                | ✔ Update | ✔ Delete   |

#### Setup Instructions:

```bash
mkdir server && cd server
npm init -y
npm install express cors morgan body-parser dotenv
npm install --save-dev nodemon
```

**Structure:**

```
src/
  controllers/
  routes/
  models/
  middleware/
  utils/
.env
app.js
server.js
```

Use Postman or curl to test routes.

---

### Practical 4: Connecting to PostgreSQL with Prisma ORM

We transition from in-memory models to a real PostgreSQL database using Prisma.

#### Key Tasks:

* Setup PostgreSQL database: `tiktok_db`
* Create and configure `.env`:

```env
DATABASE_URL="postgresql://tiktok_user:your_password@localhost:5432/tiktok_db?schema=public"
```

#### Prisma Setup:

```bash
npm install @prisma/client
npm install prisma --save-dev
npx prisma init
```

Define your schema in `prisma/schema.prisma`, then run:

```bash
npx prisma migrate dev --name init
```

#### Authentication:

* Password hashing: `bcrypt`
* Token-based auth: `jsonwebtoken`
* Middleware to protect routes

#### Seeder Script:

Populate your DB with test data:

```bash
npm install bcrypt
npm run seed
```

---

### Practical 5: Cloud Storage Integration with Supabase

We enhance the video upload system by migrating to Supabase Storage.

#### Supabase Setup:

1. Create a Supabase project
2. Create public buckets:

   * `videos`
   * `thumbnails`
3. Set access policies:

   * Authenticated users can upload
   * Public can view

#### Backend:

```bash
npm install @supabase/supabase-js
```

Create `src/lib/supabase.js` and add:

```js
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
module.exports = supabase;
```

Update `videoController.js` to upload and delete videos via Supabase. Also, extend your Prisma model to store Supabase paths.

#### Frontend (Next.js):

```bash
npm install @supabase/supabase-js
```

In `src/lib/supabase.js`:

```js
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY);
export default supabase;
```

Update:

* `uploadService.js` to handle direct uploads
* `upload/page.jsx` and `VideoCard.jsx` for rendering via Supabase URLs

---

## Testing & Deployment

* Use Postman to test API endpoints and auth
* Run migration script to move local files to Supabase

```bash
node scripts/migrateVideosToSupabase.js
```

* Clean up local storage after verifying Supabase links

---

## Folder Structure Overview

```
tiktok-clone/
  ├── server/
  │   ├── src/
  │   │   ├── controllers/
  │   │   ├── routes/
  │   │   ├── middleware/
  │   │   ├── lib/
  │   │   └── services/
  │   ├── prisma/
  │   ├── .env
  │   └── package.json
  ├── tiktok-frontend/
  │   ├── src/
  │   │   ├── app/
  │   │   ├── components/
  │   │   ├── lib/
  │   │   └── services/
  │   ├── .env.local
  │   └── package.json
```

---

## References

* [Supabase Docs](https://supabase.com/docs)
* [Prisma Docs](https://www.prisma.io/docs)
* [JWT Authentication](https://jwt.io/introduction)
* [Content Delivery Networks](https://www.cloudflare.com/learning/cdn/what-is-a-cdn/)

---

Let me know if you’d like this split into separate READMEs for frontend and backend, or want a `Reflection.md` file too!
