const { Todo } = require('../models');

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll({
      where: { user_id: req.user.userId },
      order: [['created_at', 'DESC']]
    });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const todo = await Todo.create({
      user_id: req.user.userId,
      title
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const [updatedRowsCount] = await Todo.update(
      { title, completed },
      { where: { id, user_id: req.user.userId } }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const updatedTodo = await Todo.findOne({ where: { id, user_id: req.user.userId } });
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRowsCount = await Todo.destroy({
      where: { id, user_id: req.user.userId }
    });

    if (deletedRowsCount === 0) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };