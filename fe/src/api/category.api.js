import { CATEGORY_HOST_API } from "../constants/api.constant";
import axiosInstance from "../config/axios.config";

export const getCategories = async () => {
  try {
    const response = await axiosInstance.get(CATEGORY_HOST_API);
    return response.data;
  } catch (error) {
    alert("Error fetching categories:", error);
    return { statusCode: 500, message: 'Error while fetching category' };
  }
};

export const getCategoryById = async (category_id) => {
  try {
    const response = await axiosInstance.get(`${CATEGORY_HOST_API}/${category_id}`);
    return response.data;
  } catch (error) {
    alert(`Error fetching category with ID ${category_id}:`, error);
    return { statusCode: 500, message: 'Error while fetching category by id' };
  }
};

export const getCategoryByName = async (category_name) => {
  try {
    const response = await axiosInstance.get(`${CATEGORY_HOST_API}/name/${category_name}`);
    return response.data;
  } catch (error) {
    alert(`Error fetching category with name ${category_name}:`, error);
    return { statusCode: 500, message: 'Error while fetching category by name' };
  }
};

export const createCategory = async (category) => {
  try {
    const response = await axiosInstance.post(CATEGORY_HOST_API, category);
    return response.data;
  } catch (error) {
    alert("Error creating category:", error);
    return { statusCode: 500, message: 'Error while creating' };
  }
};

export const updateCategory = async (category) => {
  try {
    const response = await axiosInstance.put(`${CATEGORY_HOST_API}/${category.category_id}`, category);
    return response.data;
  } catch (error) {
    alert(`Error updating category with ID ${category.category_id}:`, error);
    return { statusCode: 500, message: 'Error while updating' };
  }
};

export const deleteCategoryById = async (category_id) => {
  try {
    const response = await axiosInstance.delete(`${CATEGORY_HOST_API}/${category_id}`);
    return response.data;
  } catch (error) {
    alert(`Error deleting category with ID ${category_id}:`, error);
    return { statusCode: 500, message: 'Error while deleting category' };
  }
};
