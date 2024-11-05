// src/store/priority.js
import { defineStore } from 'pinia';
import axios from '../axios/axios.js';
export const usePriorityStore = defineStore('priority', {
  state: () => ({
    priorities: [],
    error: null,
  }),
  actions: {
    async fetchPriorities() {
      try {
        const response = await axios.get('/priorities'); // Assurez-vous que cette route existe dans votre backend
        this.priorities = response.data;
      } catch (error) {
        this.error = error.response ? error.response.data.message : 'Erreur lors de la récupération des priorités';
      }
    },
    async addPriority(priority) {
      try {
        const response = await axios.post('/priorities', priority); // Assurez-vous que cette route existe dans votre backend
        this.priorities.push(response.data); // Ajoute la priorité retournée par le backend
      } catch (error) {
        this.error = error.response ? error.response.data.message : 'Erreur lors de l\'ajout de la priorité';
      }
    },
    async updatePriority(updatedPriority) {
      try {
        await axios.put(`/priorities/${updatedPriority.id}`, updatedPriority); // Assurez-vous que cette route existe dans votre backend
        const index = this.priorities.findIndex(priority => priority.id === updatedPriority.id);
        if (index !== -1) {
          this.priorities[index] = updatedPriority; // Met à jour la priorité dans l'état local
        }
      } catch (error) {
        this.error = error.response ? error.response.data.message : 'Erreur lors de la mise à jour de la priorité';
      }
    },
    async deletePriority(id) {
      try {
        await axios.delete(`/priorities/${id}`); // Assurez-vous que cette route existe dans votre backend
        this.priorities = this.priorities.filter(priority => priority.id !== id); // Supprime la priorité de l'état local
      } catch (error) {
        this.error = error.response ? error.response.data.message : 'Erreur lors de la suppression de la priorité';
      }
    },
  },
});
