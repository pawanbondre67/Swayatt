import api from '../BaseApi';
import { User } from './type';


// Register a user
export const register = async (userData : User) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

// Login a user
export const login = async (credentials : User) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};