# Social Media RESTful API 

This practical demonstrates how to design and implement a RESTful API for a simple social media platform. We will build and test endpoints for Users, Posts, Comments, Likes, and Followers using Node.js and Express, following REST best practices.

---

## Getting Started

### Step 1: Set Up Your Project Folder

Create a new folder for your API project and navigate into it:

```bash
mkdir social-media-api
cd social-media-api
````

### Step 2: Initialize Node.js

Start a new Node project:

```bash
npm init -y
```

Then install the essential dependencies:

```bash
npm install express morgan cors helmet
npm install --save-dev nodemon
```

---

## Organize Your Project

Set up a clean folder structure:

```bash
mkdir -p controllers routes middleware config utils public
touch server.js .env .gitignore
```

Inside your `.env` file, add:

```
PORT=3000
```

In your `.gitignore`, make sure to exclude:

```
node_modules
.env
.DS_Store
```

And don't forget to add your start scripts in `package.json`:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

---

## Build the Server

Inside `server.js`, set up a basic Express server with middleware like helmet, cors, and morgan. This file will handle incoming requests and route them appropriately.

---

## Add Mock Data

Since we aren’t using a real database yet, create a `utils/mockData.js` file and paste in mock data for users, posts, etc. This will be used to simulate API responses.

---

## Handle Errors Gracefully

Create:

* `middleware/errorHandler.js` for centralized error management.
* `utils/errorResponse.js` to format error messages.
* `middleware/async.js` to simplify error handling in async routes.

---

## Create Controllers

For each resource (like Users and Posts), define controllers in the `controllers/` folder. These will handle:

* Getting all items
* Fetching a specific item by ID
* Creating new items
* Updating items
* Deleting items

Start with `userController.js` and `postController.js`, and replicate the logic for other resources later.

---

## Define Routes

In the `routes/` folder, create separate route files for each resource (`users.js`, `posts.js`, etc.). Connect these to your controllers, and import them into `server.js`.

---

## Support Multiple Formats

To support content negotiation (like responding with different MIME types), create a `middleware/formatResponse.js` and include it in your server setup.

---

## Create HTML API Docs

Inside the `public/` folder, create a `docs.html` file. This page should describe each endpoint, including:

* The HTTP method
* The URL pattern
* Parameters (query or path)
* Request body format
* Example responses

Serve this file from `/docs` so users can view the documentation in the browser.

---

## Run Your API

Once everything’s set up, run your server in development mode:

```bash
npm run dev
```

Visit `http://localhost:3000/api/users` or any other endpoint to test your API.

To see your API documentation, visit:

```bash
http://localhost:3000/docs.html
```

---

## What's Covered

* Designing clean RESTful endpoints
* Using proper HTTP methods and status codes
* Simulating authentication with headers
* Sending consistent responses
* Structuring a scalable Node.js API
* Including HTML documentation

---

## Next Steps

* Implement real database integration (like MongoDB)
* Add real authentication using JWT
* Validate incoming data with middleware
* Write automated tests

---

### API Design for Social Media Platform

---

###  Users Resource

| URI/End point   | HTTP Method | Request Body                                                                                                                                                                                                                                     | Response Body                                                                                                                                                                                                                                                                         | Description           |
| --------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| **/users**      | **GET**     | **Header:** Authorization: Bearer {token}<br>**Query Parameters:** page=1, limit=10                                                                                                                                                              | **Status:** 200 OK<br>`{ "success": true, "count": 50, "page": 1, "total_pages": 5, "data": [{ "id": 1, "username": "traveler", "full_name": "Karma", "profile_picture": "https://example.com/profiles/alex.jpg", "bio": "Travel photographer", "created_at": "2023-01-15" }, ...] }` | Get a list of users   |
| **/users**      | **POST**    | **Headers:** Authorization: Bearer {token}<br>**Content-Type:** application/json<br>**Body:** `{ "username": "new_traveler", "email": "new@example.com", "password": "securepassword", "full_name": "New Traveler", "bio": "Adventure seeker" }` | **Status:** 201 Created<br>`{ "success": true, "data": { "id": 51, "username": "new_traveler", "full_name": "New Traveler", "created_at": "2023-03-20" } }`                                                                                                                           | Create a new user     |
| **/users/{id}** | **GET**     | **Header:** Authorization: Bearer {token}                                                                                                                                                                                                        | **Status:** 200 OK<br>`{ "success": true, "data": { "id": 1, "username": "traveler", "full_name": "Karma", "email": "karma@example.com", "profile_picture": "https://example.com/profiles/alex.jpg", "bio": "Travel photographer", "created_at": "2023-01-15" } }`                    | Get a specific user   |
| **/users/{id}** | **PUT**     | **Header:** Authorization: Bearer {token}<br>**Body:** `{ "full_name": "Karma Tshering", "bio": "Nomadic explorer", "profile_picture": "https://example.com/profiles/new.jpg" }`                                                                 | **Status:** 200 OK<br>`{ "success": true, "data": { "id": 1, "full_name": "Karma Tshering", "bio": "Nomadic explorer", "profile_picture": "https://example.com/profiles/new.jpg", "updated_at": "2023-04-01" } }`                                                                     | Update a user profile |
| **/users/{id}** | **DELETE**  | **Header:** Authorization: Bearer {token}                                                                                                                                                                                                        | **Status:** 200 OK<br>`{ "success": true, "message": "User deleted successfully" }`                                                                                                                                                                                                   | Delete a user account |

---

###  Posts Resource

| URI/End point   | HTTP Method | Request Body                                                                                                                                               | Response Body                                                                                                                                                                                | Description             |
| --------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| **/posts**      | **GET**     | Header: Authorization: Bearer {token}                                                                                                                      | Status: 200 OK<br>`{ "success": true, "data": [ { "id": 101, "caption": "Sunset vibes", "image_url": "https://example.com/images/1.jpg", "user_id": 1, "created_at": "2023-01-25" }, ...] }` | List all posts          |
| **/posts**      | **POST**    | Header: Authorization: Bearer {token}<br>Content-Type: application/json<br>Body: `{ "caption": "New post", "image_url": "https://example.com/image.jpg" }` | Status: 201 Created<br>`{ "success": true, "data": { "id": 102, "caption": "New post", "image_url": "https://example.com/image.jpg", "user_id": 1 } }`                                       | Create a new post       |
| **/posts/{id}** | **GET**     | Header: Authorization: Bearer {token}                                                                                                                      | Status: 200 OK<br>`{ "success": true, "data": { "id": 101, "caption": "Sunset vibes", "image_url": "https://example.com/images/1.jpg", "user_id": 1 } }`                                     | Get a specific post     |
| **/posts/{id}** | **PUT**     | Header: Authorization: Bearer {token}<br>Body: `{ "caption": "Updated caption" }`                                                                          | Status: 200 OK<br>`{ "success": true, "data": { "id": 101, "caption": "Updated caption" } }`                                                                                                 | Update an existing post |
| **/posts/{id}** | **DELETE**  | Header: Authorization: Bearer {token}                                                                                                                      | Status: 200 OK<br>`{ "success": true, "message": "Post deleted successfully" }`                                                                                                              | Delete a post           |

---

### Comments Resource

| URI/End point      | HTTP Method | Request Body                                                                               | Response Body                                                                                                                                          | Description            |
| ------------------ | ----------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| **/comments**      | **GET**     | Header: Authorization: Bearer {token}                                                      | Status: 200 OK<br>`{ "success": true, "data": [ { "id": 201, "post_id": 101, "user_id": 2, "text": "Beautiful!", "created_at": "2023-01-26" }, ...] }` | List all comments      |
| **/comments**      | **POST**    | Header: Authorization: Bearer {token}<br>Body: `{ "post_id": 101, "text": "Great view!" }` | Status: 201 Created<br>`{ "success": true, "data": { "id": 202, "post_id": 101, "text": "Great view!" } }`                                             | Create a new comment   |
| **/comments/{id}** | **GET**     | Header: Authorization: Bearer {token}                                                      | Status: 200 OK<br>`{ "success": true, "data": { "id": 201, "post_id": 101, "text": "Beautiful!" } }`                                                   | Get a specific comment |
| **/comments/{id}** | **PUT**     | Header: Authorization: Bearer {token}<br>Body: `{ "text": "Absolutely stunning!" }`        | Status: 200 OK<br>`{ "success": true, "data": { "id": 201, "text": "Absolutely stunning!" } }`                                                         | Update a comment       |
| **/comments/{id}** | **DELETE**  | Header: Authorization: Bearer {token}                                                      | Status: 200 OK<br>`{ "success": true, "message": "Comment deleted successfully" }`                                                                     | Delete a comment       |

---

### Likes Resource

| URI/End point   | HTTP Method | Request Body                                                        | Response Body                                                                                        | Description    |
| --------------- | ----------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | -------------- |
| **/likes**      | **GET**     | Header: Authorization: Bearer {token}                               | Status: 200 OK<br>`{ "success": true, "data": [ { "id": 301, "post_id": 101, "user_id": 2 }, ...] }` | List all likes |
| **/likes**      | **POST**    | Header: Authorization: Bearer {token}<br>Body: `{ "post_id": 101 }` | Status: 201 Created<br>`{ "success": true, "data": { "id": 302, "post_id": 101, "user_id": 2 } }`    | Like a post    |
| **/likes/{id}** | **DELETE**  | Header: Authorization: Bearer {token}                               | Status: 200 OK<br>`{ "success": true, "message": "Like removed" }`                                   | Unlike a post  |

---

### Followers Resource

| URI/End point       | HTTP Method | Request Body                                                          | Response Body                                                                                              | Description                   |
| ------------------- | ----------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ----------------------------- |
| **/followers**      | **GET**     | Header: Authorization: Bearer {token}                                 | Status: 200 OK<br>`{ "success": true, "data": [ { "id": 401, "follower_id": 2, "followed_id": 1 }, ...] }` | List all follow relationships |
| **/followers**      | **POST**    | Header: Authorization: Bearer {token}<br>Body: `{ "followed_id": 1 }` | Status: 201 Created<br>`{ "success": true, "data": { "id": 402, "follower_id": 2, "followed_id": 1 } }`    | Follow a user                 |
| **/followers/{id}** | **DELETE**  | Header: Authorization: Bearer {token}                                 | Status: 200 OK<br>`{ "success": true, "message": "Unfollowed successfully" }`                              | Unfollow a user               |


