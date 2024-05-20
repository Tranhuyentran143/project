import axiosInstance from "../config/axios.config";
import { CART_HOST_API } from "../constants/api.constant";

export const getCartItemsByUserId = async (userId) => {
  try {
    const response = await axiosInstance.get(`${CART_HOST_API}/${userId}`);
    return response.data;
  } catch (error) {
    alert(`Error fetching cart items for user ID ${userId}:`, error);
    return { statusCode: 500, message: 'Error while fetching cart items' };
  }
};

export const addToCart = async (cartItems) => {
  try {
    const response = await axiosInstance.post(CART_HOST_API, cartItems);
    return response.data;
  } catch (error) {
    alert("Error adding items to cart:", error);
    return { statusCode: 500, message: 'Error while adding items to cart' };
  }
};

export const updateCartItem = async (cartItem) => {
  try {
    const response = await axiosInstance.put(`${CART_HOST_API}/update/${cartItem.id}`, cartItem);
    return response.data;
  } catch (error) {
    alert(`Error updating cart item with ID ${cartItem.id}:`, error);
    return { statusCode: 500, message: 'Error while updating cart item' };
  }
};

export const removeCartItemById = async (id) => {
  try {
    const response = await axiosInstance.delete(`${CART_HOST_API}/delete/${id}`);
    return response.data;
  } catch (error) {
    alert(`Error removing cart item with ID ${id}:`, error);
    return { statusCode: 500, message: 'Error while removing cart item' };
  }
};

export const removeCartItem = async (itemId, cartItems, setCartItems, calculateTotalPrice) => {
  try {
    await axiosInstance.delete(`http://localhost:8081/api/v1/carts/${itemId}`);
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
    calculateTotalPrice(updatedItems);
  } catch (error) {
    alert('Error removing item from cart:', error);
    return { statusCode: 500, message: 'Error while removing item from cart' };
  }
};

// export const clearCart = async (setCartItems, setTotalPrice) => {
//   try {
//     await axiosInstance.delete('http://localhost:8081/api/v1/carts/items');
//     setCartItems([]);
//     setTotalPrice(0);
//   } catch (error) {
//     alert('Error clearing cart:', error);
//     return { statusCode: 500, message: 'Error while clearing cart' };
//   }
// };
