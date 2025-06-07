## Practical 2: TikTok - REST API Design and Implementation

## Introduction

In this practical, I developed a RESTful backend API for a TikTok-style web application using **Node.js** and **Express**. The objective was to design and implement endpoints that serve core resources like videos, users, and comments, and ensure full CRUD operations with logical relationships between them. The backend was structured to interact seamlessly with a Next.js frontend, emphasizing modularity, scalability, and testability.


## Key Concepts Learned

Throughout this exercise, I gained in-depth exposure to the following backend development concepts:

1. **RESTful API Design**  
   - Defined clear endpoints for resources (`/api/videos`, `/api/users`, `/api/comments`).
   - Applied proper HTTP methods: `GET`, `POST`, `PUT`, and `DELETE`.

2. **Express Routing and Controllers**  
   - Segregated logic into controller functions and route files for maintainability.
   - Applied `req.params` and `req.body` appropriately to extract user and payload information.

3. **In-Memory Data Modeling**  
   - Used JavaScript arrays and objects as mock databases for `users`, `videos`, and `comments`.

4. **Error Handling & Validation**  
   - Implemented checks for invalid IDs, missing data, and duplicate relationships.
   - Returned proper status codes: `200`, `201`, `204`, `400`, `404`, `409`.

5. **User Relationship Management**  
   - Added logic for following/unfollowing users and liking/unliking videos or comments.
   - Ensured that followers and following lists were kept in sync.

6. **Testing with Postman/cURL**  
   - Verified endpoints using Postman and command-line `curl` commands for comprehensive coverage.


## Problems Faced & Solutions

| Problem | Description | Solution |
|--------|-------------|----------|
| **Circular Follow Relationships** | Users could follow themselves or create duplicate follows. | Added checks to prevent self-following and duplicate followers. |
| **Error Handling Gaps** | Initial responses didn’t catch `undefined` or missing parameters. | Introduced explicit validation for each required field and improved error messages. |
| **Data Consistency After Delete** | Deleting users or videos didn’t remove associated comments or likes. | Added cascade deletion logic in `deleteUser` and `deleteVideo` controller methods. |
| **Incorrect HTTP Status Codes** | Initially returned `200` even on errors. | Corrected status codes to `404` (not found), `409` (conflict), `400` (bad request), and `201` (created). |
| **Route Overlap Issues** | Some routes like `/videos/:id/likes` clashed with `/videos/:id`. | Adjusted routing order and used `express.Router()` modular files to prevent conflicts. |



## What I Built

- A full **modular Express backend** using the following folder structure:
```

server/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── app.js
├── .env
├── package.json
└── index.js

```

- Fully working API endpoints for:
- `GET /api/videos`, `POST /api/videos`, `PUT /api/videos/:id`, `DELETE /api/videos/:id`
- `GET /api/users`, `PUT /api/users/:id`, `DELETE /api/users/:id`, `POST /api/users/:id/followers`
- `GET /api/comments`, `POST /api/comments`, etc.



## Testing Highlights

Tested key flows using **Postman** and `curl`:
- Fetching videos and comments
- Creating new users and videos
- Updating video titles/descriptions
- Following/unfollowing users
- Liking/unliking videos and comments

Each request was tested for both **happy path** and **edge cases** (e.g., invalid IDs, empty bodies).



## Conclusion

This practical significantly improved my confidence in backend development and API structuring. I learned how to break down functionality into reusable modules and how to simulate full-stack interactions even without a real database. Building this TikTok-style REST API laid a strong foundation for integrating real-world frontend clients and expanding to database support using MongoDB or PostgreSQL in future projects.

Overall, this was a rewarding and educational experience in developing scalable and testable APIs from scratch.


