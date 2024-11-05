<template>
  <div class="add-complaint p-4 bg-light rounded shadow-sm">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="text-center">Ajouter une Réclamation</h2>
      <button @click="goBack" class="btn btn-outline-secondary">Retour</button>
    </div>
    <form @submit.prevent="addComplaint">
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea v-model="complaint.description" id="description" class="form-control" required></textarea>
      </div>
      <div class="mb-3">
        <label for="submissionDate" class="form-label">Date de Soumission</label>
        <input v-model="complaint.submissionDate" id="submissionDate" type="date" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="status" class="form-label">Statut</label>
        <select v-model="complaint.status" id="status" class="form-select" required>
          <option :value="status.value" v-for="status in statusOptions" :key="status.value">{{ status.label }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="resolutionDate" class="form-label">Date de Résolution</label>
        <input v-model="complaint.resolutionDate" id="resolutionDate" type="date" class="form-control" />
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
      <button type="submit" class="btn btn-primary">Ajouter</button>
    </form>
    <div v-if="errorMessage" class="alert alert-danger mt-3">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      complaint: {
        description: '',
        submissionDate: '',
        status: 'pending',
        resolutionDate: '',
        priorityId: null,
        categoryId: null,
        clientId: null
      },
      clients: [],
      priorities: [],
      categories: [],
      errorMessage: '',
      statusOptions: [
        { value: 'pending', label: 'En attente' },
        { value: 'resolved', label: 'Résolue' },
        { value: 'rejected', label: 'Rejetée' }
      ]
    };
  },
  created() {
    this.fetchClients();
    this.fetchPriorities();
    this.fetchCategories();
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
    async addComplaint() {
      try {
        if (this.complaint.resolutionDate) {
          this.complaint.resolutionDate = new Date(this.complaint.resolutionDate).toISOString().split('T')[0];
        }
        this.complaint.submissionDate = new Date(this.complaint.submissionDate).toISOString().split('T')[0];

        await axios.post('http://localhost:3000/api/complaints', this.complaint);
        alert('Réclamation ajoutée avec succès.');
        this.$router.push('/complaint');
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Erreur inconnue lors de l\'ajout de la réclamation';
        console.error('Erreur lors de l\'ajout de la réclamation :', error);
      }
    }
  }
};
</script>

<style scoped>
.form-label {
  font-weight: bold;
}
.bg-light {
  background-color: #f8f9fa !important;
}
h2 {
  font-weight: bold;
}
.shadow-sm {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.btn-outline-secondary {
  border: 1px solid #6c757d;
  color: #6c757d;
  transition: background-color 0.3s;
}
.btn-outline-secondary:hover {
  background-color: #6c757d;
  color: white;
}
.alert {
  margin-top: 20px;
}
</style>
