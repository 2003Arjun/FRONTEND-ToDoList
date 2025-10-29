# Full-Stack Todo Application

A complete todo application with user authentication built with React (frontend) and Node.js + Express + Sequelize + MySQL (backend).

## Project Structure

```
todo-list/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── SignUp.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── TodoContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   └── App.jsx
│   └── package.json
└── backend/           # Node.js backend API
    ├── config/
    │   └── database.js
    ├── controllers/
    │   ├── authController.js
    │   └── todoController.js
    ├── middleware/
    │   └── auth.js
    ├── models/
    │   ├── User.js
    │   ├── Todo.js
    │   └── index.js
    ├── routes/
    │   ├── auth.js
    │   └── todos.js
    ├── .env
    └── server.js
```

## Features

✅ **Authentication System**
- User registration and login
- JWT token-based authentication
- Password hashing with bcrypt
- Protected routes

✅ **Account-based Todo Lists**
- Each user sees only their own todos
- CRUD operations for todos
- Real-time updates

✅ **Backend APIs**
- `/api/auth/signup` - Create account
- `/api/auth/login` - User login
- `/api/todos` - CRUD operations for todos

✅ **Frontend Integration**
- React Context for state management
- Native HTTP fetch (no axios dependency)
- Route protection
- Responsive design

## Setup Instructions

### 1. Database Setup

1. Install MySQL and create a database:
```sql
CREATE DATABASE todo_app;
```

2. Update the `.env` file in the backend directory:
```env
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=todo_app
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
PORT=5000
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the server
npm run dev
```

The backend will automatically create the necessary tables using Sequelize.

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Todos (Protected Routes)
- `GET /api/todos` - Get user's todos
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

## Tech Stack

**Frontend:**
- React 19
- Context API for state management
- Native Fetch API for HTTP requests
- React Router for navigation

**Backend:**
- Node.js
- Express.js
- Sequelize ORM
- MySQL database
- JWT for authentication
- bcrypt for password hashing

## How It Works

1. **User Registration/Login**: Users can create accounts or login with existing credentials
2. **Authentication**: JWT tokens are stored in localStorage and sent with each request
3. **Protected Routes**: Todo functionality is only accessible to authenticated users
4. **User-specific Data**: Each user can only see and manage their own todos
5. **Real-time Updates**: Changes are immediately reflected in the UI

## Development Notes

- The frontend uses native fetch instead of axios for HTTP requests
- Sequelize handles database operations and relationships
- JWT tokens expire after 7 days
- All routes are protected except authentication endpoints
- Database tables are automatically created on server start