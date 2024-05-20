import axiosInstance from "../config/axios.config";
import { PRODUCT_HOST_API } from "../constants/api.constant";

export const getProducts = async () => {
  try {
    const response = await axiosInstance.get(PRODUCT_HOST_API);
    return response.data;
  } catch (error) {
    alert("Error fetching products:", error);
    return { statusCode: 500, message: 'Error while fetching products' };
  }
};

export const getProductsByCategoryName = async (categoryName) => {
  try {
    const response = await axiosInstance.get(`${PRODUCT_HOST_API}?category=${categoryName}`);
    return response.data;
  } catch (error) {
    alert(`Error fetching products by category name ${categoryName}:`, error);
    return { statusCode: 500, message: 'Error while fetching products by category name' };
  }
};

export const getProductById = async (product_id) => {
  try {
    const response = await axiosInstance.get(`${PRODUCT_HOST_API}/${product_id}`);
    return response.data;
  } catch (error) {
    alert(`Error fetching product by ID ${product_id}:`, error);
    return { statusCode: 500, message: 'Error while fetching product by ID' };
  }
};

export const createProduct = async (product) => {
  try {
    const response = await axiosInstance.post(PRODUCT_HOST_API, product);
    return response.data;
  } catch (error) {
    alert("Error creating product:", error);
    return { statusCode: 500, message: 'Error while creating product' };
  }
};

export const updateProduct = async (product) => {
  try {
    const response = await axiosInstance.put(`${PRODUCT_HOST_API}/${product.product_id}`, product);
    return response.data;
  } catch (error) {
    alert(`Error updating product with ID ${product.product_id}:`, error);
    return { statusCode: 500, message: 'Error while updating product' };
  }
};

export const deleteProductById = async (product_id) => {
  try {
    const response = await axiosInstance.delete(`${PRODUCT_HOST_API}/${product_id}`);
    return response.data;
  } catch (error) {
    alert(`Error deleting product with ID ${product_id}:`, error);
    return { statusCode: 500, message: 'Error while deleting product' };
  }
};
