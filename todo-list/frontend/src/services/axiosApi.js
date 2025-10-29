import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000
});

export const axiosApi = {
  getTodos: async () => {
    const response = await api.get('/todos?_limit=10');
    return response.data;
  },

  createTodo: async (todo) => {
    const response = await api.post('/todos', todo);
    return response.data;
  },

  updateTodo: async (id, todo) => {
    const response = await api.put(`/todos/${id}`, todo);
    return response.data;
  },

  deleteTodo: async (id) => {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  }
};