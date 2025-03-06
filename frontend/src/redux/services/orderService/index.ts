import api from '../BaseApi';
import { OrderData } from './type';

// Create an order
export const createOrder = async (orderData : OrderData) => {
  const response = await api.post('/orders/create-order', orderData);
  return response.data;
};

// Get all orders
export const fetchOrders = async () => {
  const response = await api.get('/orders');
  return response.data;
};

// Update order status
export const updateOrderStatus = async (orderId : string, status : string) => {
  const response = await api.put(`/orders/${orderId}/status`, { status });
  return response.data;
};

// Delete an order
export const deleteOrder = async (orderId : string) => {
  const response = await api.delete(`/orders/${orderId}`);
  return response.data;
};

//fetch order by status or workstation
export const fetchOrdersByStatus = async (status : string) => {
  const response = await api.get(`/orders/status/${status}`);
  return response.data;
};

export const fetchOrdersByWorkstation = async (workstationName : string) => {
  const response = await api.get(`/orders/workstation/${workstationName}`);
  return response.data;
};

export const fetchOrdersByStatusAndWorkstation = async (status : string, workstationName : string) => {
  const response = await api.get(`/orders/status/${status}/workstation/${workstationName}`);
  return response.data;
};
