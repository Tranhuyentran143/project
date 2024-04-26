import axios from "axios";
import { CART_HOST_API } from "../constants/api.constant";

export const getCartItems = async () => {
  const response = await axios.get(CART_HOST_API);
  return response.data;
};

export const getCartItemById = async (item_id) => {
  const response = await axios.get(`${CART_HOST_API}/${item_id}`);
  return response.data;
};

export const addToCart = async (cartItem) => {
  const response = await axios.post(CART_HOST_API, cartItem);
  return response.data;
};

export const updateCartItem = async (cartItem) => {
  const response = await axios.put(`${CART_HOST_API}/${cartItem.id}`, cartItem);
  return response.data;
};

export const removeCartItemById = async (item_id) => {
  const response = await axios.delete(`${CART_HOST_API}/${item_id}`);
  return response.data;
};
