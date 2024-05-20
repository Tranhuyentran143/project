import axiosInstance from "../config/axios.config";
import { USER_HOST_API } from "../constants/api.constant";

export const getUsers = async () => {
  try {
    const response = await axiosInstance.get(USER_HOST_API);
    console.log("Data from getUsers:", response.data);
    return response.data;
  } catch (error) {
    alert("Error fetching users:", error);
    return { statusCode: 500, message: 'Error while fetching users' };
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axiosInstance.get(`${USER_HOST_API}/${id}`);
    return response.data;
  } catch (error) {
    alert(`Error fetching user by ID ${id}:`, error);
    return { statusCode: 500, message: 'Error while fetching user by ID' };
  }
};

export const createUser = async (user) => {
  try {
    const response = await axiosInstance.post(USER_HOST_API, user);
    return response.data;
  } catch (error) {
    alert("Error creating user:", error);
    return { statusCode: 500, message: 'Error while creating user' };
  }
};

export const updateUser = async (user) => {
  try {
    const response = await axiosInstance.put(`${USER_HOST_API}/update/${user.id}`, user);
    return response.data;
  } catch (error) {
    alert(`Error updating user with ID ${user.id}:`, error);
    return { statusCode: 500, message: 'Error while updating user' };
  }
};

export const deleteUserById = async (id) => {
  try {
    const response = await axiosInstance.delete(`${USER_HOST_API}/delete/${id}`);
    return response.data;
  } catch (error) {
    alert(`Error deleting user with ID ${id}:`, error);
    return { statusCode: 500, message: 'Error while deleting user' };
  }
};
