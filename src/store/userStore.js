// src/store/userStore.js
import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './authStore';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    users: [],
  }),
  
  actions: {
    async fetchUsers() {
      const authStore = useAuthStore();
      try {
        const response = await axios.get('http://localhost:3000/api/users', {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        });
        this.users = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error.message);
        throw error;
      }
    },

    async addUser(user) {
      const authStore = useAuthStore();
      try {
        const response = await axios.post('http://localhost:3000/api/users', user, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        });
        this.users.push(response.data); // Ajoute l'utilisateur retourné par le backend
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur :", error.response?.data || error.message);
        throw error;
      }
    },

    async updateUser(updatedUser) {
      const authStore = useAuthStore();
      try {
        await axios.put(`http://localhost:3000/api/users/${updatedUser.id}`, updatedUser, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        });
        const index = this.users.findIndex(user => user.id === updatedUser.id);
        if (index !== -1) {
          this.users[index] = updatedUser; // Met à jour l'utilisateur dans l'état local
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur :", error.message);
        throw error;
      }
    },

    async deleteUser(id) {
      const authStore = useAuthStore();
      try {
        await axios.delete(`http://localhost:3000/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        });
        this.users = this.users.filter(user => user.id !== id); // Supprime l'utilisateur de l'état local
      } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur :", error.message);
        throw error;
      }
    },
  },

  persist: true,
});
