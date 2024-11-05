<template>
  <div class="detail-complaint p-4 bg-light rounded shadow-sm">
    <h2 class="text-center mb-4">Détails de la Réclamation</h2>
    <div class="mb-3">
      <strong>ID :</strong> {{ complaint.id }}
    </div>
    <div class="mb-3">
      <strong>Description :</strong> {{ complaint.description }}
    </div>
    <div class="mb-3">
      <strong>Date de Soumission :</strong> {{ formatDate(complaint.soumission_date) }}
    </div>
    <div class="mb-3">
      <strong>Statut :</strong> {{ getStatus(complaint.statut) }}
    </div>
    <div class="mb-3">
      <strong>Date de Résolution :</strong> {{ formatDate(complaint.resolved_date) }}
    </div>
    <div class="mb-3">
      <strong>Priorité :</strong> {{ complaint.priorityId || 'Non définie' }}
    </div>
    <div class="mb-3">
      <strong>Catégorie :</strong> {{ complaint.categoryId || 'Non définie' }}
    </div>
    <div class="mb-3">
      <strong>Client ID :</strong> {{ complaint.clientId || 'Non défini' }}
    </div>
    <router-link to="/complaint" class="btn btn-secondary">Retour à la liste des réclamations</router-link>
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
      }
    };
  },

  methods: {
    async fetchComplaintDetails() {
      const id = this.$route.params.id; // Récupérer l'ID de la réclamation depuis les paramètres de la route
      try {
        const response = await axios.get(`http://localhost:3000/api/complaints/${id}`);
        this.complaint = response.data; // Assurez-vous que l'API renvoie les données correctes
        console.log(this.complaint); // Vérifiez les données reçues dans la console
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de la réclamation:', error);
      }
    },

    formatDate(date) {
      return date ? new Date(date).toLocaleDateString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit' }) : 'Non définie';
    },

    getStatus(status) {
      const statuses = {
        'En attente': 'En attente',
        'Résolu': 'Résolu',
        'En cours': 'En cours',
        'Rejeté': 'Rejeté',
        'Inconnu': 'Inconnu'
      };
      return statuses[status] || 'Inconnu';
    }
  },

  created() {
    this.fetchComplaintDetails();
  }
};
</script>

<style scoped>
.detail-complaint {
  border: 1px solid #ced4da;
}
strong {
  color: #343a40;
}
</style>
