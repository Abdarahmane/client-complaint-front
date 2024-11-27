import { defineStore } from 'pinia';
import axios from 'axios';
import router from '../router';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    userRole: localStorage.getItem('userRole') || 'user',
    userName: localStorage.getItem('userName') || null,
    message: '',
    isLoading: false,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.userRole === 'admin',
  },
  actions: {
    async login(email, password) {
      this.message = '';
      this.isLoading = true;

      try {
        const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
        const { token, user } = response.data;

        if (!token || !user) {
          this.message = 'Erreur : Données de connexion invalides.';
          this.isLoading = false;
          return;
        }

        // Mise à jour des données
        this.token = token;
        this.userRole = user.role || 'user';
        this.userName = user.name || 'Utilisateur';

        localStorage.setItem('token', this.token);
        localStorage.setItem('userRole', this.userRole);
        localStorage.setItem('userName', this.userName);

        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        this.message = 'Connexion réussie ! Bienvenue.';

        router.push({ name: 'Dashboard' });
      } catch (error) {
        console.error('Erreur de connexion :', error);
        this.message = error.response?.data?.error || 'Connexion échouée. Vérifiez vos identifiants.';
      } finally {
        this.isLoading = false;
      }
    },

    // Nouvelle méthode pour synchroniser le rôle de l'utilisateur
    syncUserRole() {
      this.userRole = localStorage.getItem('userRole') || 'user';
    },

    logout() {
      if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        this.token = null;
        this.userRole = 'user';
        this.userName = null;

        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');

        delete axios.defaults.headers.common['Authorization'];
        this.message = 'Vous êtes déconnecté.';
        router.push({ name: 'Login' });
      }
    },
  },
});
