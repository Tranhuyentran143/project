import axios from "axios";
import { PRODUCT_HOST_API } from "../constants/api.constant";

export const getProducts = async () => {
  const response = await axios.get(PRODUCT_HOST_API);
  return response.data;
};

export const getProductByCategory = async (category_name) => {
  const response = await axios.get(`${PRODUCT_HOST_API}?category=${category_name}`);
  return response.data;
};
export const getProductById = async (product_id) => {
  const response = await axios.get(`${PRODUCT_HOST_API}/${product_id}`);
  return response.data;
};

export const createProduct = async (product) => {
  const response = await axios.post(PRODUCT_HOST_API, product);
  return response.data;
};

export const updateProduct = async (product) => {
  const response = await axios.put(`${PRODUCT_HOST_API}/${product.product_id}`, product);
  return response.data;
};

export const deleteProductById = async (product_id) => {
  const response = await axios.delete(`${PRODUCT_HOST_API}/${product_id}`);
  return response.data;
};
