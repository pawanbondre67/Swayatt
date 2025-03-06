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

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('authState', serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
};

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
    return undefined;
  }
};

// Initial state
const initialState = {
  UserData: loadState()?.UserData || {
    token: null as string | null,
    role: null as string | null,
    userId: null as string | null,
    username: null as string | null,
    status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null as string | null,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SetUserData: (state, action) => {
      state.UserData = action.payload;
      saveState(state); // Save state to localStorage when UserData is updated
    },
    logout: (state) => {
      state.UserData = {
        token: null,
        role: null,
        userId: null,
        username: null,
        status: 'idle',
        error: null,
      };
      saveState(state); // Save state to localStorage on logout
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.UserData.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.UserData = {
          token: action.payload.token,
          role: action.payload.role,
          userId: action.payload.user.id,
          username: action.payload.user.username,
          status: 'succeeded',
          error: null,
        };
        saveState(state); // Save state to localStorage on login
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.UserData.status = 'failed';
        state.UserData.error = action.error.message || 'Login failed';
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.UserData.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.UserData = {
          token: action.payload.token,
          role: action.payload.role,
          userId: action.payload.user.id,
          username: action.payload.user.username,
          status: 'succeeded',
          error: null,
        };
        saveState(state); // Save state to localStorage on register
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.UserData.status = 'failed';
        state.UserData.error = action.error.message || 'Registration failed';
      });
  },
});

export const { SetUserData, logout } = authSlice.actions;
export default authSlice.reducer;