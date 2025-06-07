# Practical 3: Implementing File Upload on the Server Application

## Objective

Implement a secure and efficient server-side file upload system using Node.js and Express. This includes receiving, validating, storing, and serving files uploaded from a React/Next.js frontend. You will learn to handle multipart form data, enforce file type and size restrictions, implement proper error handling, and connect the frontend with the backend for a full file upload workflow.

---

## Implementation Flow

1. **Setup the Express server environment**  
   Install dependencies and create the basic server structure to handle HTTP requests.

2. **Configure middleware for file handling**  
   Use Multer middleware to process multipart form data and manage file storage.

3. **Create upload API endpoints**  
   Develop routes to accept file uploads with validation of file types and sizes, and securely save files.

4. **Implement validation and security**  
   Add file type checks, size limits, and robust error handling to prevent security risks.

5. **Connect the frontend to the backend**  
   Modify the React/Next.js frontend to send upload requests to the Express server instead of Next.js API routes.

6. **Test the complete system**  
   Verify that files upload correctly, progress is tracked, validation works, and files are stored/accessed properly.

---

## Setup Instructions

### Step 1: Initialize the Backend Project

```bash
mkdir file-upload-server
cd file-upload-server
npm init -y
npm install express cors multer morgan dotenv
````

* `express`: Web framework for Node.js
* `cors`: Middleware to enable cross-origin requests
* `multer`: Middleware for handling multipart/form-data uploads
* `morgan`: HTTP request logger for debugging
* `dotenv`: Manage environment variables securely

---

### Step 2: Basic Server Structure

Create `server.js` with Express setup, middleware, and a basic route. Include logging, JSON parsing, and CORS configuration.

---

### Step 3: Configure Multer

Set up Multer in `server.js` to:

* Define storage destination and filename conventions
* Apply file filters to accept specific file types
* Enforce size limits

---

### Step 4: Create Upload Endpoint

Implement a POST route `/api/upload` to:

* Receive multipart form uploads
* Validate and store files
* Return appropriate success or error responses

Add error handling middleware to catch Multer and server errors.

---

### Step 5: Configure CORS

Allow your frontend origin (e.g., `http://localhost:3000`) to communicate with your backend on a different port.

---

### Step 6: Modify Frontend to Connect to Backend

* Update Axios POST request URL to point to your Express backend, e.g., `http://localhost:8000/api/upload`.
* Adjust drag-and-drop and preview components to handle new file types and display filenames appropriately.

---

### Step 7: Test the Complete System

1. Run backend: `node server.js`
2. Run frontend: `npm run dev` in your React/Next.js project
3. Access the upload page in a browser
4. Upload files and confirm:

   * Upload progress tracking works
   * Validation for file types and sizes works
   * Files are saved in the backend uploads directory
   * Errors are handled and displayed correctly

---

## Reference

For full implementation details and example code, visit the official backend practical repository:
[https://github.com/syangche/Backend\_Practicals.git](https://github.com/syangche/Backend_Practicals.git)

