// apiService.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://fakestoreapi.com/',
  headers: { 'Content-Type': 'application/json' }
});

// Auth requests
export async function loginRequest(username, password) {
  const response = await apiClient.post('auth/login', { username, password });
  return response.data;
}

// Product requests
export async function fetchProducts() {
  const response = await apiClient.get("products");
  console.log("Fetched products:", response.data);
  return response.data;
}

export async function fetchProductDetails(id) {
  try {
      const response = await apiClient.get(`products/${id}`);
      console.log('API Response:', response.data); // Tambahkan log ini
      return response.data;
  } catch (error) {
      console.error('Error in fetchProductDetails:', error);
      throw error; // Lempar error agar bisa ditangani di komponen
  }
}


export async function addToCart(userId, products) {
  const response = await apiClient.post('carts', {
    userId,
    date: new Date().toISOString(),
    products
  });
  return response.data;
}

export async function fetchCart(userId) {
  const response = await apiClient.get(`carts/user/${userId}`);
  return response.data;
}

export async function updateCart(cartId, products) {
  const response = await apiClient.put(`carts/${cartId}`, {
    userId: 1, // Replace with dynamic userId if available
    date: new Date().toISOString(),
    products
  });
  return response.data;
}

export async function deleteCart(cartId) {
  const response = await apiClient.delete(`carts/${cartId}`);
  return response.data;
}
