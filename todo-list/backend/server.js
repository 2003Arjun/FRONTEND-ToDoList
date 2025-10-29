const express = require('express');
const cors = require('cors');
require('dotenv').config();

const mysql = require('mysql2/promise');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Todo API is running!' });
});

const PORT = process.env.PORT || 5000;

// Create database if it doesn't exist
async function createDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });
  
  await connection.execute(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
  await connection.end();
}

// Initialize database and start server
createDatabase()
  .then(() => sequelize.sync({ force: false }))
  .then(() => {
    console.log('Database synced successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to sync database:', err);
  });