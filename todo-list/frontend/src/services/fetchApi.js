const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchApi = {
  getTodos: async () => {
    const response = await fetch(`${API_BASE_URL}/todos?_limit=10`);
    if (!response.ok) throw new Error('Failed to fetch todos');
    return response.json();
  },

  createTodo: async (todo) => {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo)
    });
    if (!response.ok) throw new Error('Failed to create todo');
    return response.json();
  },

  updateTodo: async (id, todo) => {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo)
    });
    if (!response.ok) throw new Error('Failed to update todo');
    return response.json();
  },

  deleteTodo: async (id) => {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete todo');
    return response.json();
  }
};