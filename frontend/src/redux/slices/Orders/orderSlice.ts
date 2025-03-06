import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createOrder, fetchOrders, updateOrderStatus, deleteOrder } from '../../services/orderService';

// Fetch all orders
export const fetchAllOrders = createAsyncThunk('orders/fetchAll', async () => {
  const data = await fetchOrders();
  return data;
});

// Create an order
export const addOrder = createAsyncThunk('orders/create', async (orderData) => {
  const data = await createOrder(orderData);
  return data;
});

// Update order status
export const updateStatus = createAsyncThunk('orders/updateStatus', async ({ orderId, status }) => {
  const data = await updateOrderStatus(orderId, status);
  return data;
});

// Delete an order
export const removeOrder = createAsyncThunk('orders/delete', async (orderId) => {
  await deleteOrder(orderId);
  return orderId;
});

const orderSlice = createSlice({
  name: 'orders',
  initialState: { orders: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex((order) => order._id === action.payload._id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(removeOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter((order) => order._id !== action.payload);
      });
  },
});

export default orderSlice.reducer;