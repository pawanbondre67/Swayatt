import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/Auth/authSlice';
import orderReducer from '../slices/Orders/orderSlice';
import materialReducer from '../slices/material/materialSlice';
import workstationReducer from '../slices/workStation/workStationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: orderReducer,
    materials: materialReducer,
    workstations: workstationReducer,
  },
});




export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;