<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class="detail-complaint p-4 bg-light rounded shadow-sm">
      <h2 class="text-center mb-4">Détails de la Réclamation</h2>
      <div class="grid-container">
        <div><strong>ID :</strong></div>
        <div>{{ complaint.id }}</div>

        <div><strong>Description :</strong></div>
        <div>{{ complaint.description }}</div>

        <div><strong>Date de Soumission :</strong></div>
        <div>{{ formatDate(complaint.soumission_date) }}</div>

        <div><strong>Statut :</strong></div>
        <div>{{ getStatus(complaint.statut) }}</div>

        <div><strong>Date de Résolution :</strong></div>
        <div>{{ formatDate(complaint.resolved_date) }}</div>

        <div><strong>Priorité :</strong></div>
        <div>{{ getPriorityName(complaint.priorityId) }}</div>

        <div><strong>Catégorie :</strong></div>
        <div>{{ getCategoryName(complaint.categoryId) }}</div>

        <div><strong>Client :</strong></div>
        <div>{{ getClientName(complaint.clientId) }}</div>

        <div><strong>Utilisateur Assigné :</strong></div>
        <div>{{ getUserName(complaint.userId) }}</div>
      </div>
      <div class="text-center mt-4">
        <router-link to="/complaint" class="btn btn-primary">Retour</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      complaint: {
        id: null,
        description: '',
        soumission_date: null,
        statut: 'unknown',
        resolved_date: null,
        priorityId: null,
        categoryId: null,
        clientId: null,
        userId: null, // Pour l'utilisateur assigné
      },
      priorities: [],
      categories: [],
      clients: [],
      users: [], // Liste des utilisateurs
    };
  },

  methods: {
    async fetchComplaintDetails() {
      const id = this.$route.params.id;
      try {
        const response = await axios.get(`http://localhost:3000/api/complaints/${id}`);
        this.complaint = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de la réclamation:', error);
      }
    },

    async fetchPriorities() {
      try {
        const response = await axios.get('http://localhost:3000/api/priorities');
        this.priorities = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des priorités :', error);
      }
    },

    async fetchCategories() {
      try {
        const response = await axios.get('http://localhost:3000/api/categories');
        this.categories = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error);
      }
    },

    async fetchClients() {
      try {
        const response = await axios.get('http://localhost:3000/api/clients');
        this.clients = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des clients :', error);
      }
    },

    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        this.users = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      }
    },

    getPriorityName(id) {
      const priority = this.priorities.find((p) => p.id === id);
      return priority ? priority.name : 'Non définie';
    },

    getCategoryName(id) {
      const category = this.categories.find((c) => c.id === id);
      return category ? category.name : 'Non définie';
    },

    getClientName(id) {
      const client = this.clients.find((c) => c.id === id);
      return client ? client.name : 'Non défini';
    },

    getUserName(id) {
      if (!id) return 'Non assigné';
      const user = this.users.find((u) => u.id === id);
      return user ? user.name : 'Nom non disponible';
    },

    formatDate(date) {
      return date
        ? new Date(date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
        : 'Non définie';
    },

    getStatus(status) {
      const statuses = {
        'En attente': 'En attente',
        'Résolu': 'Résolu',
        'En cours': 'En cours',
        'Rejeté': 'Rejeté',
        'Inconnu': 'Inconnu',
      };
      return statuses[status] || 'Inconnu';
    },
  },

  async created() {
    await Promise.all([
      this.fetchComplaintDetails(),
      this.fetchPriorities(),
      this.fetchCategories(),
      this.fetchClients(),
      this.fetchUsers(), // Charger les utilisateurs
    ]);
  },
};
</script>

<style scoped>
.detail-complaint {
  border: 1px solid #ced4da;
  width: 100%;
  max-width: 600px;
}

.d-flex {
  min-height: 100vh;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 10px;
}

strong {
  color: #343a40;
}
</style>
