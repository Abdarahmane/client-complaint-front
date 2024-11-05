// src/store/category.js
import { defineStore } from 'pinia';
import axios from '../axios/axios.js';

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [],
    error: null,
  }),
  actions: {
    async fetchCategories() {
      try {
        const response = await axios.get('/categories');
        this.categories = response.data;
      } catch (error) {
        this.error = error.response ? error.response.data.message : 'Erreur lors de la récupération des catégories';
      }
    },
    async addCategory(data) {
      try {
        await axios.post('/categories', data);
        await this.fetchCategories(); // Recharger les catégories
      } catch (error) {
        this.error = error.response ? error.response.data.message : 'Erreur lors de l\'ajout de la catégorie';
      }
    },
    async deleteCategory(id) {
      try {
        await axios.delete(`/categories/${id}`);
        await this.fetchCategories(); // Recharger les catégories
      } catch (error) {
        this.error = error.response ? error.response.data.message : 'Erreur lors de la suppression de la catégorie';
      }
    },
    async updateCategory(id, data) {
      try {
        await axios.put(`/categories/${id}`, data);
        await this.fetchCategories(); // Recharger les catégories
      } catch (error) {
        this.error = error.response ? error.response.data.message : 'Erreur lors de la mise à jour de la catégorie';
      }
    },
  },
});
