// src/store/complaint.js
import { defineStore } from 'pinia';
import axios from '../axios/axios.js';

export const useComplaintStore = defineStore('complaint', {
  state: () => ({
    complaints: [],
    error: null,
  }),
  actions: {
    async fetchComplaints() {
      try {
        const response = await axios.get('/complaints');
        this.complaints = response.data;
      } catch (error) {
        this.error = error.response ? error.response.data.message : 'Erreur lors de la récupération des réclamations';
      }
    },
    async addComplaint(data) {
      try {
        await axios.post('/complaints', data);
        await this.fetchComplaints(); // Recharger les réclamations
      } catch (error) {
        this.error = error.response ? error.response.data.message : 'Erreur lors de l\'ajout de la réclamation';
      }
    },
    async deleteComplaint(id) {
      try {
        await axios.delete(`/complaints/${id}`);
        await this.fetchComplaints(); // Recharger les réclamations
      } catch (error) {
        this.error = error.response ? error.response.data.message : 'Erreur lors de la suppression de la réclamation';
      }
    },
    async updateComplaint(id, data) {
      try {
        await axios.put(`/complaints/${id}`, data);
        await this.fetchComplaints(); // Recharger les réclamations
      } catch (error) {
        this.error = error.response ? error.response.data.message : 'Erreur lors de la mise à jour de la réclamation';
      }
    },
  },
});
