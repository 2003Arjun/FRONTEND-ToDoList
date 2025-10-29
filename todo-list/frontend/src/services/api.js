const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to make HTTP requests
const makeRequest = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    },
    ...options
  };

  const response = await fetch(`${API_BASE_URL}${url}`, config);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Request failed');
  }
  
  return response.json();
};

// Auth API
export const authAPI = {
  signup: (userData) => makeRequest('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(userData)
  }),
  login: (credentials) => makeRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  })
};

// Todo API
export const todoAPI = {
  getTodos: () => makeRequest('/todos'),
  createTodo: (todo) => makeRequest('/todos', {
    method: 'POST',
    body: JSON.stringify(todo)
  }),
  updateTodo: (id, todo) => makeRequest(`/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(todo)
  }),
  deleteTodo: (id) => makeRequest(`/todos/${id}`, {
    method: 'DELETE'
  })
};

export default { authAPI, todoAPI };