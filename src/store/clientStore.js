// src/store/client.js
import { defineStore } from 'pinia';
import axios from '../axios/axios.js';

export const useClientStore = defineStore('client', {
  state: () => ({
    clients: [],
    error: null,
  }),
  actions: {
    async fetchClients() {
      try {
        const response = await axios.get('/clients');
        this.clients = response.data;
      } catch (error) {
        this.error = error.response ? error.response.data.message : 'Erreur lors de la récupération des clients';
      }
    },
    async addClient(data) {
      try {
        await axios.post('/clients', data);
        await this.fetchClients(); // Recharger les clients
      } catch (error) {
        this.error = error.response ? error.response.data.message : 'Erreur lors de l\'ajout du client';
      }
    },
    async deleteClient(id) {
      try {
        await axios.delete(`/clients/${id}`);
        await this.fetchClients(); // Recharger les clients
      } catch (error) {
        this.error = error.response ? error.response.data.message : 'Erreur lors de la suppression du client';
      }
    },
    async updateClient(id, data) {
      try {
        await axios.put(`/clients/${id}`, data);
        await this.fetchClients(); // Recharger les clients
      } catch (error) {
        this.error = error.response ? error.response.data.message : 'Erreur lors de la mise à jour du client';
      }
    },
  },
});