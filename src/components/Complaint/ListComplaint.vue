<template>
  <div class="list-complaint p-4 bg-light rounded shadow-sm">
    <h2 class="text-center mb-4">Liste des Réclamations</h2>

    <div class="d-flex justify-content-between align-items-center mb-4">
      <router-link to="/complaint/add" class="btn btn-success shadow-sm">
        <i class="fas fa-plus"></i> Ajouter Réclamation
      </router-link>
      <div class="d-flex align-items-center">
        <input 
          type="text" 
          v-model="searchQuery" 
          @input="debounceSearch" 
          class="form-control me-2 rounded-pill shadow-sm" 
          placeholder="Rechercher une réclamation..." 
          style="width: 300px;"
        />
        <button class="btn btn-outline-secondary shadow-sm" @click="searchComplaint">
          <i class="fas fa-search"></i> 
        </button>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-hover table-striped align-middle shadow-sm">
        <thead class="bg-primary text-white">
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Date de Soumission</th>
            <th>Statut</th>
            <th>Date de Résolution</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredComplaints.length === 0">
            <td colspan="6" class="text-center">Aucune réclamation disponible</td>
          </tr>
          <tr v-for="complaint in filteredComplaints" :key="complaint.id">
            <td>{{ complaint.id }}</td>
            <td>{{ complaint.description }}</td>
            <td>{{ formatDate(complaint.soumission_date) }}</td>
            <td>{{ getStatus(complaint.statut) }}</td>
            <td>{{ formatDate(complaint.resolved_date) }}</td>
            <td class="d-flex justify-content-center">
              <router-link 
                :to="`/complaint/detail/${complaint.id}`" 
                class="btn btn-secondary btn-sm shadow-sm me-2"
              >
                <i class="fas fa-eye"></i> 
              </router-link>
              <router-link 
                :to="`/complaint/update/${complaint.id}`" 
                class="btn btn-info btn-sm shadow-sm me-2"
              >
                <i class="fas fa-edit"></i> 
              </router-link>
              <button 
                class="btn btn-danger btn-sm shadow-sm" 
                @click="confirmDeleteComplaint(complaint.id)"
              >
                <i class="fas fa-trash"></i> 
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchQuery: '',
      complaints: [],
      errorMessage: '',
      searchTimeout: null,
    };
  },

  computed: {
    filteredComplaints() {
      return this.complaints.filter(complaint =>
        complaint.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  
  methods: {
    async fetchComplaints() {
      try {
        const response = await axios.get('http://localhost:3000/api/complaints');
        this.complaints = response.data;
        console.log('Réclamations récupérées:', this.complaints);
      } catch (error) {
        this.errorMessage = 'Erreur lors de la récupération des réclamations.';
        console.error('Erreur lors de la récupération des réclamations:', error);
      }
    },

    debounceSearch() {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.searchComplaint();
      }, 300);
    },
    
    searchComplaint() {
      this.filteredComplaints;
    },

    confirmDeleteComplaint(id) {
      if (window.confirm('Voulez-vous vraiment supprimer cette réclamation ?')) {
        this.deleteComplaint(id);
      }
    },
    
    async deleteComplaint(id) {
      try {
        await axios.delete(`http://localhost:3000/api/complaints/${id}`);
        await this.fetchComplaints();
        alert('Réclamation supprimée avec succès.');
      } catch (error) {
        this.errorMessage = 'Erreur lors de la suppression de la réclamation.';
        console.error('Erreur lors de la suppression de la réclamation:', error);
      }
    },

    formatDate(date) {
      return date ? new Date(date).toLocaleDateString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit' }) : 'N/A';
    },

    getStatus(status) {
      const statuses = {
        'En attente': 'En attente',
        'Résolu': 'Résolu',
        'En Cours': 'En Cours',
        'Rejeté': 'Rejeté'
      };
      return statuses[status] || 'Statut Inconnu';
    }
  },

  created() {
    this.fetchComplaints();
  }
};
</script>

<style scoped>
.table th, .table td {
  text-align: center;
  vertical-align: middle;
}
.table-hover tbody tr:hover {
  background-color: #f8f9fa;
}
.btn {
  transition: transform 0.2s;
}
.btn:hover {
  transform: translateY(-2px);
}
.shadow-sm {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.bg-light {
  background-color: #f8f9fa !important;
}
h2 {
  font-weight: bold;
}
.d-flex .btn {
  margin-right: 0.5rem;
}
.alert {
  margin-top: 20px;
}
</style>
