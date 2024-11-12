// src/store/complaintStore.js
import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./authStore";

export const useComplaintStore = defineStore("complaintStore", {
  state: () => ({
    complaints: [],
  }),

  actions: {
    async fetchComplaints() {
      const authStore = useAuthStore();
      try {
        const response = await axios.get("http://localhost:3000/api/complaints", {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        });
        this.complaints = response.data;
        return this.complaints;
      } catch (error) {
        console.error("Erreur lors de la récupération des réclamations :", error.message);
        throw error;
      }
    },

    async fetchComplaintById(id) {
      const authStore = useAuthStore();
      try {
        const response = await axios.get(`http://localhost:3000/api/complaints/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        });
        return response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération de la réclamation :", error.message);
        throw error;
      }
    },

    async addComplaint(data) {
      const authStore = useAuthStore();
      try {
        const response = await axios.post("http://localhost:3000/api/complaints", data, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        });
        if (response.status !== 200 && response.status !== 201) {
          throw new Error("L'ajout a échoué.");
        }
        await this.fetchComplaints(); // Recharger les réclamations après ajout
      } catch (error) {
        console.error("Erreur lors de l'ajout de la réclamation :", error.response?.data || error.message);
        throw error;
      }
    },

    async updateComplaint(id, data) {
      const authStore = useAuthStore();
      try {
        await axios.put(`http://localhost:3000/api/complaints/${id}`, data, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        });
        await this.fetchComplaints(); // Recharger les réclamations après mise à jour
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la réclamation :", error.message);
        throw error;
      }
    },

    async deleteComplaint(id) {
      const authStore = useAuthStore();
      try {
        await axios.delete(`http://localhost:3000/api/complaints/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        });
        await this.fetchComplaints(); // Recharger les réclamations après suppression
      } catch (error) {
        console.error("Erreur lors de la suppression de la réclamation :", error.message);
        throw error;
      }
    },
  },

  persist: true,
});
