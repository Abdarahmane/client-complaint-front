// src/store/authStore.js
import { defineStore } from 'pinia';
import axios from 'axios';
import router from '../router';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    userRole: localStorage.getItem('userRole') || null, // Ajouter le rôle de l'utilisateur
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.userRole === 'admin', // Getter pour vérifier si l'utilisateur est un admin
  },
  actions: {
    async login(email, password) {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', { email, password });
        console.log('Response data:', response.data);
    
        this.token = response.data.token;
        this.userRole = response.data.user?.role || response.data.role || null; // Vérification conditionnelle
    
        localStorage.setItem('token', this.token);
        localStorage.setItem('userRole', this.userRole);
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        router.push({ name: 'Dashboard' });
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
    ,
    logout() {
      this.token = null;
      this.userRole = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      delete axios.defaults.headers.common['Authorization'];
      router.push({ name: 'Login' });
    },
  },
});
