// src/store/auth.js
import { defineStore } from 'pinia';
import axios from '../axios/axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    error: null,
  }),
  actions: {
    async login(credentials) {
      try {
        const response = await axios.post('/auth/login', credentials);
        this.token = response.data.token;
        this.user = response.data.user;
        localStorage.setItem('token', this.token); // Sauvegarder le token
      } catch (error) {
        this.error = error.response ? error.response.data.message : 'Erreur de connexion';
      }
    },
    async register(data) {
      try {
        await axios.post('/auth/register', data);
        this.error = null;
      } catch (error) {
        this.error = error.response ? error.response.data.message : 'Erreur lors de l\'inscription';
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
    },
  },
});
