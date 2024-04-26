import axios from "axios";
import { CATEGORY_HOST_API } from "../constants/api.constant";

export const getCategories = async () => {
  const response = await axios.get(CATEGORY_HOST_API);
  return response.data;
};

export const getCategoryById = async (category_id) => {
  const response = await axios.get(`${CATEGORY_HOST_API}/${category_id}`);
  return response.data;
};

export const getCategoryByName = async (category_name) => {
  const response = await axios.get(`${CATEGORY_HOST_API}/${category_name}`);
  return response.data;
};

export const createCategory = async (category) => {
  const response = await axios.post(CATEGORY_HOST_API, category);
  return response.data;
};

export const updateCategory = async (category) => {
  const response = await axios.put(`${CATEGORY_HOST_API}/${category.category_id}`, category);
  return response.data;
};

export const deleteCategoryById = async (category_id) => {
  const response = await axios.delete(`${CATEGORY_HOST_API}/${category_id}`);
  return response.data;
};
