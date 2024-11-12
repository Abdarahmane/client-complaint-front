<template>
  <div class="list-priority p-4 bg-custom-#f8f9fa rounded shadow-container">
    <h2 class="text-center mb-4 text-custom-dark">Liste des Priorités</h2>

    <div class="d-flex justify-content-between align-items-center mb-4">
      <router-link to="/priority/add" class="btn btn-success shadow-sm">
        <i class="fas fa-plus"></i> Ajouter Priorite
      </router-link>
      <div class="d-flex align-items-center">
        <input 
          type="text" 
          v-model="searchQuery" 
          class="form-control me-2 rounded-pill shadow-sm" 
          placeholder="Rechercher une priorité..." 
          style="width: 300px;"
        />
        <button class="btn btn-outline-secondary shadow-sm" @click="searchPriority">
          <i class="fas fa-search"></i>
        </button>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-hover table-striped align-middle shadow-sm">
        <thead class="bg-primary text-white">
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="priority in filteredPriorities" :key="priority.id">
            <td>{{ priority.id }}</td>
            <td>{{ priority.name }}</td>
            <td>
              <router-link 
                :to="`/home/priority/detail/${priority.id}`" 
                class="btn btn-primary btn-sm shadow-sm"
              >
                <i class="fas fa-eye"></i>
              </router-link>
              <router-link 
                :to="`/home/priority/update/${priority.id}`" 
                class="btn btn-info btn-sm shadow-sm ms-2"
              >
                <i class="fas fa-edit"></i>
              </router-link>
              <button 
                class="btn btn-danger btn-sm shadow-sm ms-2" 
                @click="confirmDelete(priority.id)"
              >
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchQuery: '',
      priorities: [],
    };
  },
  computed: {
    filteredPriorities() {
      return this.priorities.filter(priority =>
        priority.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    async fetchPriorities() {
      try {
        const response = await axios.get('http://localhost:3000/api/priorities');
        this.priorities = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des priorités:', error);
      }
    },
    searchPriority() {
      // Logique de recherche si nécessaire
    },
    confirmDelete(id) {
      if (confirm('Voulez-vous vraiment supprimer cette priorité ?')) {
        this.deletePriority(id);
      }
    },
    async deletePriority(id) {
      try {
        await axios.delete(`http://localhost:3000/api/priorities/${id}`);
        console.log('Priorité supprimée:', id);
        this.priorities = this.priorities.filter(priority => priority.id !== id);
      } catch (error) {
        console.error('Erreur lors de la suppression de la priorité:', error);
      }
    },
  },
  mounted() {
    this.fetchPriorities(); // Fetch priorities when the component is mounted
  },
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
.bg-light {
  background-color: #f8f9fa !important;
}
.shadow-container {
  background-color: #f8f9fa;
  width: 80%; /* Largeur à 80% */
  margin: 0 auto; /* Centrer le conteneur */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Ombre autour du conteneur */
  
}
</style>
