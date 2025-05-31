import axios from 'axios';

const API_URL = '/service/todo'; // Matches your Vite proxy

// Get all todos
const getTodos = async () => {
  const response = await axios.get(`${API_URL}/get_all`);
  return response.data;
};

// Add new todo
const addTodo = async (todoData) => {
  const response = await axios.post(`${API_URL}/add_todo`, todoData);
  return response.data;
};

// Update todo
const updateTodo = async (id, updatedData) => {
  const response = await axios.patch(`${API_URL}/update_todo/${id}`, updatedData);
  return response.data;
};

// Delete todo
const deleteTodo = async (id) => {
  const response = await axios.delete(`${API_URL}/delete_todo/${id}`);
  return response.data;
};

const todoService = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};

export default todoService;
