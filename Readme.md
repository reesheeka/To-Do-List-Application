# To-Do List Application

## Description

This is a simple to-do list application that allows users to register, login, logout and manage their tasks. The application includes user authentication, role-based access control, and caching with Redis to optimize task retrieval.

## Features

- User registration, login, and logout
- JWT-based authentication
- CRUD operations for tasks
- Role-based access control (RBAC) for task management
- Pagination for task retrieval
- Redis caching for optimized task retrieval

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose)
- Redis
- JSON Web Token (JWT)
- bcrypt for password hashing

## Prerequisites

- Node.js and npm installed
- MongoDB installed and running
- Redis installed and running

## Installation

1. **Clone the repository:**

    git clone https://github.com/your-username/to-do-list-application.git
    cd to-do-list-application

2. **Install the dependencies:**

    npm install

3. **Start the application:**

    npm start 

    The server should be running on `http://localhost:3000`.

## API Endpoints

### User Routes

- **Register:** `POST /api/v1/user/register`
- **Login:** `POST /api/v1/user/login`
- **Logout:** `POST /api/v1/user/logout`

### Task Routes

- **Create Task:** `POST /api/v1/task/`
- **Get Tasks:** `GET /api/v1/task/get`
- **Update Task:** `PUT /api/v1/task/update/:Id`
- **Delete Task:** `DELETE /api/v1/task/delete/:Id`

### Role-Based Access Control

- Users can create and get tasks.
- Admins can create, get, update, and delete tasks.

## Testing the Application

Use tools like Postman or Insomnia to test the API endpoints. Ensure you include the JWT token in the `Authorization` header for protected routes.
