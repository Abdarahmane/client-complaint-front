<template>
  <div class="list-client p-4 bg-custom-white rounded shadow-container">
  <h2 class="text-center mb-4 text-custom-dark">Liste des Clients</h2>

    <!-- Recherche et ajout de client -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <router-link to="/client/add" class="btn btn-success shadow-sm">
        <i class="fas fa-plus"></i> Ajouter un Client
      </router-link>
      <div class="d-flex align-items-center">
        <input 
          type="text" 
          v-model="searchQuery" 
          class="form-control me-2 rounded-pill shadow-sm" 
          placeholder="Rechercher un client..." 
          style="width: 80%;"
        />
        <button class="btn btn-outline-secondary shadow-sm" @click="searchClient">
          <i class="fas fa-search"></i>
        </button>
      </div>
    </div>

    <!-- Table des clients avec ombre -->
    <div class="table-responsive">
      <table class="table table-hover table-striped align-middle shadow-sm">
        <thead class="bg-primary text-white">
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Adresse</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in filteredClients" :key="client.id">
            <td>{{ client.id }}</td>
            <td>{{ client.name }}</td>
            <td>{{ client.email }}</td>
            <td>{{ client.phone }}</td>
            <td>{{ client.address }}</td>
            <td>
              <router-link 
                :to="`/home/client/detail/${client.id}`" 
                class="btn btn-primary btn-sm shadow-sm"
              >
                <i class="fas fa-eye"></i> 
              </router-link>
              <router-link 
                :to="`/home/client/update/${client.id}`" 
                class="btn btn-info btn-sm shadow-sm ms-2"
              >
                <i class="fas fa-edit"></i> 
              </router-link>
              <button 
                class="btn btn-danger btn-sm shadow-sm ms-2" 
                @click="confirmDeleteClient(client.id)"
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
      clients: [],
    };
  },
  computed: {
    filteredClients() {
      return this.clients.filter(client =>
        client.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  mounted() {
    this.fetchClients();
  },
  methods: {
    async fetchClients() {
      try {
        const response = await axios.get('http://localhost:3000/api/clients');
        this.clients = response.data; // Assuming the response data is an array of clients
      } catch (error) {
        console.error('Erreur lors de la récupération des clients:', error);
      }
    },
    confirmDeleteClient(id) {
      if (window.confirm('Voulez-vous vraiment supprimer ce client ?')) {
        this.deleteClient(id);
      }
    },
    async deleteClient(id) {
      try {
        await axios.delete(`http://localhost:3000/api/clients/${id}`);
        this.fetchClients(); // Refresh the client list
        alert('Client supprimé avec succès.');
      } catch (error) {
        console.error('Erreur lors de la suppression du client:', error);
      }
    },
    searchClient() {
      console.log('Recherche de client:', this.searchQuery);
    },
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
.shadow-sm {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.bg-light {
  background-color: #f8f9fa !important;
}
h2 {
  font-weight: bold;
}
.table-responsive {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.shadow-container {
  background-color: #f8f9fa;
  width: 80%; /* Largeur à 80% */
  margin: 0 auto; /* Centrer le conteneur */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Ombre autour du conteneur */
}
</style>
