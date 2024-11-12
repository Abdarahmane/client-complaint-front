// src/axios/axios.js
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import router from '../router';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Your backend base URL
});

// Intercept requests to include the token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercept responses to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const authStore = useAuthStore();
      authStore.logout();
      router.push({ name: 'Login' });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
