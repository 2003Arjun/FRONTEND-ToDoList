

# 📝 Todo App (Fullstack Version)

A **fullstack Todo Application** that allows users to register, log in, and manage their daily tasks efficiently.
This project demonstrates **user authentication**, **task management**, and **persistent data storage** using a backend API and database.

---

## 🚀 Features

* 🔐 **User Authentication** (JWT-based login & registration)
* ➕ **Add New Tasks**
* ✏️ **Edit or Update Tasks**
* ✅ **Mark Tasks as Completed**
* ❌ **Delete Tasks**
* 💾 **Persistent Data Storage** (MySQL or other database)
* 🌐 **RESTful Backend APIs** for Task Management
* 🖥️ **Clean Frontend UI** for seamless user interaction

---

## 🛠️ Tech Stack

| Layer              | Technology                                      |
| ------------------ | ----------------------------------------------- |
| **Frontend**       | HTML, CSS, JavaScript *(or React, if included)* |
| **Backend**        | Node.js, Express.js                             |
| **Database**       | MySQL                                           |
| **Authentication** | JWT (JSON Web Token)                            |

---

## 📂 Folder Structure

```
todo-app/
│
├── server/               # Backend (APIs, routes, controllers, models)
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── config/
│   └── server.js
│
├── public/ or client/    # Frontend (HTML, CSS, JS files)
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .env                  # Environment variables
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone <your-repo-link>
   cd todo-app
   ```

2. **Install Dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file inside the `server/` folder and add:

   ```bash
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=todo_app
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the Backend Server**

   ```bash
   npm start
   ```

   Server runs on [http://localhost:5000](http://localhost:5000)

5. **Run the Frontend**

   * Open `index.html` from `public/` or `client/` in your browser.
   * Or, if using React:

     ```bash
     cd client
     npm install
     npm start
     ```

---

## 📡 API Endpoints

| Method | Endpoint             | Description                   |
| ------ | -------------------- | ----------------------------- |
| POST   | `/api/auth/register` | Register new user             |
| POST   | `/api/auth/login`    | Login and get JWT             |
| GET    | `/api/tasks`         | Get all tasks (Auth required) |
| POST   | `/api/tasks`         | Add new task                  |
| PUT    | `/api/tasks/:id`     | Update task details           |
| DELETE | `/api/tasks/:id`     | Delete a task                 |

---

## 🧩 Future Improvements

* ⏰ Add task due dates and reminders
* 📱 Make frontend fully responsive
* 🌈 Add dark/light theme toggle
* 🔄 Implement task filtering and sorting

---

## 👨‍💻 Author

**Arjun Thakur**
💼 Backend Developer | 🌐 MERN Stack Enthusiast
🔗 [GitHub](https://github.com/2003Arjun)

---

