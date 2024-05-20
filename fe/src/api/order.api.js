import axiosInstance from "../config/axios.config";
import { ORDER_HOST_API } from "../constants/api.constant";

export const getOrders = async () => {
  try {
    const response = await axiosInstance.get(ORDER_HOST_API);
    return response.data;
  } catch (error) {
    alert("Error fetching orders:", error);
    return { statusCode: 500, message: 'Error while fetching orders' };
  }
};

export const getOrderById = async (order_id) => {
  try {
    const response = await axiosInstance.get(`${ORDER_HOST_API}/${order_id}`);
    return response.data;
  } catch (error) {
    alert(`Error fetching order by ID ${order_id}:`, error);
    return { statusCode: 500, message: 'Error while fetching order by ID' };
  }
};

export const createOrder = async (order) => {
  try {
    const response = await axiosInstance.post(ORDER_HOST_API, order);
    return response.data;
  } catch (error) {
    alert("Error creating order:", error);
    return { statusCode: 500, message: 'Error while creating order' };
  }
};

export const updateOrder = async (order) => {
  try {
    const response = await axiosInstance.post(`${ORDER_HOST_API}/update`, order);
    return response.data;
  } catch (error) {
    alert(`Error updating Order with ID ${order.order_id}:`, error);
    return { statusCode: 500, message: 'Error while updating Order' };
  }
};

export const deleteOrderById = async (order_id) => {
  try {
    const response = await axiosInstance.delete(`${ORDER_HOST_API}/${order_id}`);
    return response.data;
  } catch (error) {
    alert(`Error deleting Order with ID ${order_id}:`, error);
    return { statusCode: 500, message: 'Error while deleting Order' };
  }
};
