const sequelize = require('../config/database');
const User = require('./User');
const Todo = require('./Todo');

// Define associations
User.hasMany(Todo, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Todo.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
  sequelize,
  User,
  Todo
};