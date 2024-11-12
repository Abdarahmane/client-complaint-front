// src/store/priorityStore.js
import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./authStore";

export const usePriorityStore = defineStore("priorityStore", {
  state: () => ({
    priorities: [],
  }),

  actions: {
    async fetchPriorities() {
      const authStore = useAuthStore();
      try {
        const response = await axios.get("http://localhost:3000/api/priorities", {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        });
        this.priorities = response.data;
        return this.priorities;
      } catch (error) {
        console.error("Erreur lors de la récupération des priorités :", error.message);
        throw error;
      }
    },

    async addPriority(priority) {
      const authStore = useAuthStore();
      try {
        const response = await axios.post("http://localhost:3000/api/priorities", priority, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        });
        if (response.status !== 200 && response.status !== 201) {
          throw new Error("L'ajout a échoué.");
        }
        this.fetchPriorities(); // Recharger les priorités
      } catch (error) {
        console.error("Erreur lors de l'ajout de la priorité :", error.response?.data || error.message);
        throw error;
      }
    },

    async updatePriority(updatedPriority) {
      const authStore = useAuthStore();
      try {
        await axios.put(`http://localhost:3000/api/priorities/${updatedPriority.id}`, updatedPriority, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        });
        this.fetchPriorities(); // Recharger les priorités
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la priorité :", error.message);
        throw error;
      }
    },

    async deletePriority(id) {
      const authStore = useAuthStore();
      try {
        await axios.delete(`http://localhost:3000/api/priorities/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        });
        this.fetchPriorities(); // Recharger les priorités
      } catch (error) {
        console.error("Erreur lors de la suppression de la priorité :", error.message);
        throw error;
      }
    },
  },

  persist: true,
});
