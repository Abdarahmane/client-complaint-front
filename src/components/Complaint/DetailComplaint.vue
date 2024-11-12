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
        <div>{{ complaint.priorityId || 'Non définie' }}</div>

        <div><strong>Catégorie :</strong></div>
        <div>{{ complaint.categoryId || 'Non définie' }}</div>

        <div><strong>Client ID :</strong></div>
        <div>{{ complaint.clientId || 'Non défini' }}</div>
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

