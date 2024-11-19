// /src/store/authStore.js
import { defineStore } from 'pinia';
import axios from 'axios';
import router from '../router';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    userRole: localStorage.getItem('userRole') || 'user', // Rôle par défaut : 'user'
    message: '',
    isLoading: false, // Indicateur de chargement
  }),
  async forgotPassword(email) {
    try {
      const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await axios.post(`${BASE_URL}/auth/forgot-password`, { email });
      return response.data.message; // Renvoyer le message de succès
    } catch (error) {
      console.error('Erreur forgotPassword:', error);
      throw error; // Propager l'erreur
    }
  },
  
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.userRole === 'admin',
    getUserRole: (state) => state.userRole,
  },
  actions: {
    async login(email, password) {
      this.message = '';
      this.isLoading = true; // Début du chargement

      try {
        // Vérification des champs
        if (!email || !password) {
          this.message = 'Veuillez remplir tous les champs.';
          this.isLoading = false;
          return;
        }

        const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
        const { token, user } = response.data;

        // Vérification des données de la réponse
        if (!token || !user) {
          this.message = 'Erreur : Données de connexion invalides.';
          this.isLoading = false;
          return;
        }

        const userRole = user.role || 'user'; // Rôle par défaut : 'user'

        // Mise à jour de l'état
        this.token = token;
        this.userRole = userRole;
        localStorage.setItem('token', this.token);
        localStorage.setItem('userRole', this.userRole);
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        this.message = 'Connexion réussie ! Bienvenue.';

        console.log('Rôle de l\'utilisateur :', this.userRole);

        // Redirection basée sur le rôle
        if (this.isAdmin) {
          router.push({ name: 'Dashboard' });
        } else {
          router.push({ name: 'Dashboard' });
        }
      } catch (error) {
        console.error('Erreur de connexion :', error);
        this.message = error.response?.data?.error || 'Connexion échouée. Vérifiez vos identifiants.';
      } finally {
        this.isLoading = false; // Fin du chargement
      }
    },

    logout() {
      if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        this.token = null;
        this.userRole = 'user'; // Réinitialisation du rôle
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        delete axios.defaults.headers.common['Authorization'];
        this.message = 'Vous êtes déconnecté.';
        router.push({ name: 'Login' });
      }
    },

    // Action pour synchroniser le rôle depuis localStorage
    syncUserRole() {
      this.userRole = localStorage.getItem('userRole') || 'user';
    },
  },
});
