// src/store/categoryStore.js
import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './authStore';

export const useCategoryStore = defineStore('categoryStore', {
  state: () => ({
    categories: [],
  }),
  
  actions: {
    async fetchCategories() {
      const authStore = useAuthStore();
      try {
        const response = await axios.get('http://localhost:3000/api/categories', {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        });
        this.categories = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error.message);
        throw error;
      }
    },

    async addCategory(data) {
      const authStore = useAuthStore();
      try {
        const response = await axios.post('http://localhost:3000/api/categories', data, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        });
        if (response.status !== 200 && response.status !== 201) {
          throw new Error("L'ajout a échoué.");
        }
        await this.fetchCategories(); // Recharger les catégories après ajout
      } catch (error) {
        console.error("Erreur lors de l'ajout de la catégorie :", error.response?.data || error.message);
        throw error;
      }
    },

    async updateCategory(id, data) {
      const authStore = useAuthStore();
      try {
        await axios.put(`http://localhost:3000/api/categories/${id}`, data, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        });
        await this.fetchCategories(); // Recharger les catégories après mise à jour
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la catégorie :", error.message);
        throw error;
      }
    },

    async deleteCategory(id) {
      const authStore = useAuthStore();
      try {
        await axios.delete(`http://localhost:3000/api/categories/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        });
        await this.fetchCategories(); // Recharger les catégories après suppression
      } catch (error) {
        console.error("Erreur lors de la suppression de la catégorie :", error.message);
        throw error;
      }
    },
  },

  persist: true,
});
