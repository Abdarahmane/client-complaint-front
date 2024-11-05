<template>
  <div class="update-complaint p-4 bg-light rounded shadow-sm">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="font-weight-bold">Modifier une Réclamation</h2>
      <button @click="goBack" class="btn btn-secondary">Retour</button>
    </div>
    <form @submit.prevent="updateComplaint">
      <div class="mb-3">
        <label for="id" class="form-label">ID</label>
        <input v-model="complaint.id" id="id" class="form-control" readonly />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea v-model="complaint.description" id="description" class="form-control" required></textarea>
      </div>
      <div class="mb-3">
        <label for="soumission_date" class="form-label">Date de Soumission</label>
        <input v-model="complaint.soumission_date" id="soumission_date" type="date" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="statut" class="form-label">Statut</label>
        <select v-model="complaint.statut" id="statut" class="form-select" required>
          <option value="En attente">En attente</option>
          <option value="Résolu">Résolu</option>
          <option value="Rejeté">Rejeté</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="resolved_date" class="form-label">Date de Résolution</label>
        <input v-model="complaint.resolved_date" id="resolved_date" type="date" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="priorityId" class="form-label">Priorité</label>
        <select v-model="complaint.priorityId" id="priorityId" class="form-select" required>
          <option value="">Sélectionnez une priorité</option>
          <option v-for="priority in priorities" :key="priority.id" :value="priority.id">{{ priority.name }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="categoryId" class="form-label">Catégorie</label>
        <select v-model="complaint.categoryId" id="categoryId" class="form-select" required>
          <option value="">Sélectionnez une catégorie</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="clientId" class="form-label">Client</label>
        <select v-model="complaint.clientId" id="clientId" class="form-select" required>
          <option value="">Sélectionnez un client</option>
          <option v-for="client in clients" :key="client.id" :value="client.id">{{ client.name }}</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Enregistrer</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      complaint: {
        id: '',
        description: '',
        soumission_date: '',
        statut: 'En attente',
        resolved_date: null,
        priorityId: null,
        categoryId: null,
        clientId: null
      },
      clients: [],
      priorities: [],
      categories: []
    };
  },
  created() {
    this.fetchClients();
    this.fetchPriorities();
    this.fetchCategories();
    this.loadComplaint();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async fetchClients() {
      try {
        const response = await axios.get('http://localhost:3000/api/clients');
        this.clients = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des clients :', error);
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
    async loadComplaint() {
  const id = this.$route.params.id;
  try {
    const response = await axios.get(`http://localhost:3000/api/complaints/${id}`);
    const data = response.data;

    this.complaint = {
      ...data,
      submissionDate: data.submissionDate ? new Date(data.submissionDate).toISOString().split('T')[0] : '',
      resolutionDate: data.resolutionDate ? new Date(data.resolutionDate).toISOString().split('T')[0] : '' // Assurez-vous que c'est une chaîne vide si non défini
    };
  } catch (error) {
    console.error('Erreur lors de la récupération de la réclamation :', error);
  }
},

    async updateComplaint() {
      try {
        await axios.put(`http://localhost:3000/api/complaints/${this.complaint.id}`, {
          ...this.complaint,
          soumission_date: this.complaint.soumission_date, // Assurez-vous d'envoyer la date sous la bonne forme
          resolved_date: this.complaint.resolved_date // Assurez-vous d'envoyer la date sous la bonne forme
        });
        alert('Réclamation mise à jour avec succès.');
        this.$router.push('/complaints'); // Redirection vers la liste des réclamations
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la réclamation :', error);
      }
    }
  }
};
</script>

<style scoped>
.bg-light {
  background-color: #f8f9fa !important;
}
h2 {
  font-weight: bold;
}
.shadow-sm {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.form-label {
  font-weight: bold;
}
</style>
