import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import todoService from './todoService';

const initialState = {
  todos: [],
  isLoading: false,
  isError: false,
  message: '',
};

// Fetch all todos
export const fetchTodos = createAsyncThunk(
  'todo/fetchAll',
  async (_, thunkAPI) => {
    try {
      return await todoService.getTodos();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Add todo
export const createTodo = createAsyncThunk(
  'todo/create',
  async (todoData, thunkAPI) => {
    try {
      return await todoService.addTodo(todoData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update todo
export const modifyTodo = createAsyncThunk(
  'todo/update',
  async ({ id, data }, thunkAPI) => {
    try {
      return await todoService.updateTodo(id, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete todo
export const removeTodo = createAsyncThunk(
  'todo/delete',
  async (id, thunkAPI) => {
    try {
      return await todoService.deleteTodo(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Add
      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })

      // Update
      .addCase(modifyTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(t => t._id === action.payload._id);
        if (index !== -1) state.todos[index] = action.payload;
      })

      // Delete
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(t => t._id !== action.payload._id);
      });
  },
});

export default todoSlice.reducer;
