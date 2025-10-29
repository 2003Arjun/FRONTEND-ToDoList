Full-Stack To-Do List Application
Project Overview
This is a complete Full-Stack To-Do List Application built with modern web technologies. It allows users to register, login, and manage their personal tasks with full CRUD (Create, Read, Update, Delete) operations.

🛠️ Technology Stack
Frontend
React 18 - Modern JavaScript library for building user interfaces

Vite - Fast build tool and development server

React Router DOM - Client-side routing for navigation

Framer Motion - Animation library for smooth UI interactions

React Icons - Icon library for UI elements

CSS3 - Custom styling with gradients and animations

Backend
Node.js - JavaScript runtime for server-side development

Express.js - Web framework for building REST APIs

MySQL - Relational database for data storage

Sequelize ORM - Object-Relational Mapping for database operations

JWT (JSON Web Tokens) - Authentication and authorization

bcryptjs - Password hashing for security

CORS - Cross-Origin Resource Sharing middleware

dotenv - Environment variable management

📁 Project Structure
FULLSTACK-ToDoList/
├── backend/
│   ├── config/
│   │   └── database.js          # Database connection configuration
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic (signup/login)
│   │   └── todoController.js    # Todo CRUD operations
│   ├── middleware/
│   │   └── auth.js             # JWT authentication middleware
│   ├── models/
│   │   ├── User.js             # User database model
│   │   ├── Todo.js             # Todo database model
│   │   └── index.js            # Model associations
│   ├── routes/
│   │   ├── auth.js             # Authentication routes
│   │   └── todos.js            # Todo routes
│   ├── .env                    # Environment variables
│   ├── server.js               # Main server file
│   └── package.json            # Backend dependencies
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Auth/
    │   │   │   ├── Login.jsx    # Login form component
    │   │   │   └── SignUp.jsx   # Registration form component
    │   │   └── ProtectedRoute.jsx # Route protection component
    │   ├── context/
    │   │   ├── AuthContext.jsx  # Authentication state management
    │   │   └── TodoContext.jsx  # Todo state management
    │   ├── pages/
    │   │   ├── Home.jsx         # Main home page
    │   │   └── About.jsx        # About page
    │   ├── services/
    │   │   └── api.js           # API communication functions
    │   ├── App.jsx              # Main app component with routing
    │   ├── ToDoList.jsx         # Todo list component
    │   ├── main.jsx             # React app entry point
    │   └── index.css            # Global styles
    └── package.json             # Frontend dependencies


Copy

Insert at cursor
🔄 Application Flow & Routing
1. Frontend Routing (React Router)
Routes:
├── "/" (Home)           - Landing page / Todo list (if authenticated)
├── "/addtodo"          - Protected todo list page
├── "/about"            - About page
└── "*"                 - 404 Not Found page

Copy

Insert at cursor
2. Backend API Endpoints
Authentication Routes (/api/auth):
├── POST /signup        - User registration
└── POST /login         - User login

Todo Routes (/api/todos):
├── GET /               - Get all user todos
├── POST /              - Create new todo
├── PUT /:id            - Update specific todo
└── DELETE /:id         - Delete specific todo

Copy

Insert at cursor
javascript
🔐 Authentication System
Registration Flow:
User fills signup form (name, email, password)

Frontend sends POST request to /api/auth/signup

Backend validates data and hashes password with bcrypt

User data saved to MySQL database

User redirected to login form

Login Flow:
User enters credentials (email, password)

Frontend sends POST request to /api/auth/login

Backend verifies credentials against database

JWT token generated and sent to frontend

Token stored in localStorage

User redirected to home page with todo list

Protected Routes:
ProtectedRoute component checks authentication status

If not authenticated: Shows login/signup forms

If authenticated: Renders protected content

JWT token sent with every API request in Authorization header

🗄️ Database Schema
Users Table:
- id (Primary Key, Auto Increment)
- name (VARCHAR)
- email (VARCHAR, Unique)
- password (VARCHAR, Hashed)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)

Copy

Insert at cursor
sql
Todos Table:
- id (Primary Key, Auto Increment)
- title (VARCHAR)
- completed (BOOLEAN, Default: false)
- userId (Foreign Key → Users.id)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)

Copy

Insert at cursor
🔄 Frontend-Backend Communication
API Service Layer:
// Frontend API functions
authAPI.signup(userData)     → POST /api/auth/signup
authAPI.login(credentials)   → POST /api/auth/login
todoAPI.getTodos()          → GET /api/todos
todoAPI.createTodo(todo)    → POST /api/todos
todoAPI.updateTodo(id, todo) → PUT /api/todos/:id
todoAPI.deleteTodo(id)      → DELETE /api/todos/:id

Copy

Insert at cursor
javascript
State Management:
AuthContext: Manages user authentication state globally

TodoContext: Manages todo data and operations

localStorage: Persists JWT token and user data

🎨 User Interface Features
Authentication UI:
Animated login/signup forms

Form validation and error handling

Smooth transitions between forms

Loading states during API calls

Todo Management UI:
Add new tasks with Enter key support

Edit tasks inline with save functionality

Mark tasks as complete/incomplete

Delete tasks with confirmation

Move tasks up/down for reordering

Animated buttons and interactions

Loading spinners for async operations

Responsive Design:
Mobile-friendly interface

Gradient backgrounds with glassmorphism effects

Fixed navigation bars (top and bottom)

Smooth animations with Framer Motion

🚀 How to Run the Project
Backend Setup:
cd backend
npm install
# Configure .env file with database credentials
npm run dev  # Starts server on port 5000

Copy

Insert at cursor
Frontend Setup:
cd frontend
npm install
npm run dev  # Starts Vite dev server on port 5173

Copy

Insert at cursor
bash
Database Setup:
Install MySQL

Create database named 'todo_app'

Update .env file with your MySQL credentials

Server automatically creates tables on startup

🔒 Security Features
Password Hashing: bcrypt with salt rounds

JWT Authentication: Secure token-based auth

Protected Routes: Middleware validation

CORS Configuration: Cross-origin request handling

Input Validation: Server-side data validation

SQL Injection Prevention: Sequelize ORM protection

📱 Key Features
User Registration & Login

Personal Todo Lists (user-specific)

CRUD Operations (Create, Read, Update, Delete)

Real-time UI Updates

Persistent Data Storage

Responsive Design

Smooth Animations

Error Handling

Loading States

Secure Authentication

This project demonstrates a complete full-stack application with modern development practices, secure authentication, and a polished user interface suitable for real-world use.