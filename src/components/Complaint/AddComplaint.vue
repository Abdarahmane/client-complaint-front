<template>
  <div class="container">
    <div class="add-complaint rounded p-4 mt-5 mx-auto">
      <h2 class="text-center mb-4">Ajouter une Réclamation</h2>
      <form @submit.prevent="addComplaint">
        <!-- Description et Date de Soumission -->
        <div class="row mb-3">
          <div class="col-md-6">
            <label for="description" class="form-label">Description</label>
            <textarea v-model="complaint.description" id="description" class="form-control custom-input" required></textarea>
            <small v-if="errorMessage && !complaint.description.trim()" class="text-danger">
              La description est obligatoire.
            </small>
          </div>
          <div class="col-md-6">
            <label for="submissionDate" class="form-label">Date de Soumission</label>
            <input v-model="complaint.soumission_date" id="submissionDate" type="date" class="form-control custom-input" required />
            <small v-if="errorMessage && !complaint.soumission_date" class="text-danger">
              La date de soumission est obligatoire.
            </small>
          </div>
        </div>

        <!-- Statut et Date de Résolution -->
        <div class="row mb-3">
          <div class="col-md-6">
            <label for="statut" class="form-label">Statut</label>
            <select v-model="complaint.statut" id="statut" class="form-select" required>
              <option value="En attente">En attente</option>
              <option value="Résolu">Résolu</option>
              <option value="Rejeté">Rejeté</option>
            </select>
          </div>
          <div class="col-md-6">
            <label for="resolutionDate" class="form-label">Date de Résolution</label>
            <input v-model="complaint.resolved_date" id="resolutionDate" type="date" class="form-control custom-input" />
            <small v-if="errorMessage && complaint.resolved_date < complaint.soumission_date" class="text-danger">
              La date de résolution ne peut pas être antérieure à la date de soumission.
            </small>
          </div>
        </div>

        <!-- Priorité et Catégorie -->
        <div class="row mb-3">
          <div class="col-md-6">
            <label for="priorityId" class="form-label">Priorité</label>
            <select v-model="complaint.priorityId" id="priorityId" class="form-select custom-input" required>
              <option value="">Sélectionnez une priorité</option>
              <option v-for="priority in priorities" :key="priority.id" :value="priority.id">{{ priority.name }}</option>
            </select>
            <small v-if="errorMessage && !complaint.priorityId" class="text-danger">
              La priorité est obligatoire.
            </small>
          </div>
          <div class="col-md-6">
            <label for="categoryId" class="form-label">Catégorie</label>
            <select v-model="complaint.categoryId" id="categoryId" class="form-select custom-input" required>
              <option value="">Sélectionnez une catégorie</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>
            <small v-if="errorMessage && !complaint.categoryId" class="text-danger">
              La catégorie est obligatoire.
            </small>
          </div>
        </div>

        <!-- Client -->
        <div class="row mb-3">
          <div class="col-md-6">
            <label for="clientId" class="form-label">Client</label>
            <select v-model="complaint.clientId" id="clientId" class="form-select custom-input" required>
              <option value="">Sélectionnez un client</option>
              <option v-for="client in clients" :key="client.id" :value="client.id">{{ client.name }}</option>
            </select>
            <small v-if="errorMessage && !complaint.clientId" class="text-danger">
              Le client est obligatoire.
            </small>
          </div>
        </div>

        <!-- Boutons -->
        <div class="d-flex justify-content-between">
          <button type="submit" class="btn btn-primary custom-btn">Ajouter</button>
          <button @click="goBack" class="btn btn-outline-primary custom-btn">Retour</button>
        </div>
      </form>
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
        soumission_date: '',
        statut: 'En attente',
        resolved_date: '',
        priorityId: null,
        categoryId: null,
        clientId: null
      },
      clients: [],
      priorities: [],
      categories: [],
      errorMessage: '',
      statusOptions: [
        { value: 'En attente', label: 'En attente' },
        { value: 'Résolue', label: 'Résolue' },
        { value: 'Rejetée', label: 'Rejetée' }
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
  const currentDate = new Date().toISOString().split('T')[0]; // Date actuelle au format "YYYY-MM-DD"
  const { description, soumission_date, resolved_date, priorityId, categoryId, clientId } = this.complaint;

  // Réinitialiser le message d'erreur
  this.errorMessage = '';

  // Vérifications des champs obligatoires
  if (!description.trim()) {
    this.errorMessage = 'La description est obligatoire.';
    return;
  }

  
  if (!soumission_date) {
    this.errorMessage = 'La date de soumission est obligatoire.';
    return;
  }
  if (!priorityId) {
    this.errorMessage = 'La priorité est obligatoire.';
    return;
  }
  if (!categoryId) {
    this.errorMessage = 'La catégorie est obligatoire.';
    return;
  }
  if (!clientId) {
    this.errorMessage = 'Le client est obligatoire.';
    return;
  }

  // Validation de la date de soumission
  if (soumission_date > currentDate) {
    this.errorMessage = 'La date de soumission ne peut pas être dans le futur.';
    return;
  }

  // Validation de la date de résolution
  if (resolved_date && resolved_date < soumission_date) {
    this.errorMessage = 'La date de résolution ne peut pas être antérieure à la date de soumission.';
    return;
  }

  try {
    // Requête pour ajouter la réclamation
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
.add-complaint {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 60%;
  max-width: 600px;
}
.custom-input {
  border-radius: 10px;
}
.custom-btn {
  border-radius: 20px;
  padding: 10px 20px;
  /* color: white; */
}

.btn-outline-primary {
  color: white;
  /* border-color: #007bff;  */
  background-color: #007bff;
}
.form-label{
  font-weight: bold;
  color:gray ;
}
</style>
