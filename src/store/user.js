// src/store/user.js
import { defineStore } from 'pinia';
import axios from '../axios/axios.js';


export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    error: null,
  }),
  actions: {
    async fetchUsers() {
      try {
        const response = await axios.get('/users'); // Assurez-vous que cette route existe dans votre backend
        this.users = response.data;
      } catch (error) {
        this.error = error.response ? error.response.data.message : 'Erreur lors de la récupération des utilisateurs';
      }
    },
    async addUser(user) {
      try {
        const response = await axios.post('/users', user); // Assurez-vous que cette route existe dans votre backend
        this.users.push(response.data); // Ajoute l'utilisateur retourné par le backend
      } catch (error) {
        this.error = error.response ? error.response.data.message : 'Erreur lors de l\'ajout de l\'utilisateur';
      }
    },
    async updateUser(updatedUser) {
      try {
        await axios.put(`/users/${updatedUser.id}`, updatedUser); // Assurez-vous que cette route existe dans votre backend
        const index = this.users.findIndex(user => user.id === updatedUser.id);
        if (index !== -1) {
          this.users[index] = updatedUser; // Met à jour l'utilisateur dans l'état local
        }
      } catch (error) {
        this.error = error.response ? error.response.data.message : 'Erreur lors de la mise à jour de l\'utilisateur';
      }
    },
    async deleteUser(id) {
      try {
        await axios.delete(`/users/${id}`); // Assurez-vous que cette route existe dans votre backend
        this.users = this.users.filter(user => user.id !== id); // Supprime l'utilisateur de l'état local
      } catch (error) {
        this.error = error.response ? error.response.data.message : 'Erreur lors de la suppression de l\'utilisateur';
      }
    },
  },
});
