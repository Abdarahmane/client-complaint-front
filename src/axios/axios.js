// src/axios/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', // Remplacez par l'URL de votre backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur de requête (si nécessaire pour les tokens)
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Récupérer le token depuis le localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
