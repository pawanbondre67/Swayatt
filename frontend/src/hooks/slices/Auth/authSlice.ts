import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register } from '../../services/AuthService';
import { User } from './type';

// Login user
export const loginUser = createAsyncThunk('auth/login', async (credentials: User) => {
  
  const data = await login(credentials);
  return data;
});

// Register user
export const registerUser = createAsyncThunk('auth/register', async (userData: User) => {
  const data = await register(userData);
  return data;
});


const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('authState', serializedState);
  } catch (err) {
    // Handle errors
    console.error(err);
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null as string | null,
    role: null as string | null,
    userId: null as string | null, 
    username: null as string | null, 
    status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null as string | null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.userId = null; 
      state.username = null;
      state.status = 'idle';
      state.error = null;
      saveState(state); // Save state to localStorage on logout
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.userId = action.payload.user.id; // Set userId
        state.username = action.payload.user.username; // Set username
        saveState(state); // Save state to localStorage on login
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Login failed';
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.userId = action.payload.user.id;
        state.username = action.payload.user.username;
        saveState(state); // Save state to localStorage on register
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Registration failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;