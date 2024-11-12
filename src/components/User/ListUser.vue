<template>
  <div class="list-user p-4 bg-custom-white rounded shadow-container">
    <h2 class="text-center mb-4 text-custom-dark">Liste des Utilisateurs</h2>

    <!-- Recherche et ajout d'utilisateur -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <router-link to="/user/add" class="btn btn-success shadow-sm">
        <i class="fas fa-plus"></i> Ajouter un Utilisateur
      </router-link>
      <div class="d-flex align-items-center">
        <input 
          type="text" 
          v-model="searchQuery" 
          class="form-control me-2 rounded-pill shadow-sm" 
          placeholder="Rechercher un utilisateur..." 
          style="width: 80%;"
        />
        <button class="btn btn-outline-secondary shadow-sm" @click="searchUser">
          <i class="fas fa-search"></i>
        </button>
      </div>
    </div>

    <!-- Table des utilisateurs avec ombre -->
    <div class="table-responsive">
      <table class="table table-hover table-striped align-middle shadow-sm">
        <thead class="bg-primary text-white">
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>
              <router-link 
                :to="`/home/user/detail/${user.id}`" 
                class="btn btn-primary btn-sm shadow-sm"
              >
                <i class="fas fa-eye"></i> 
              </router-link>
              <router-link 
                :to="`/home/user/update/${user.id}`" 
                class="btn btn-info btn-sm shadow-sm ms-2"
              >
                <i class="fas fa-edit"></i> 
              </router-link>
              <button 
                class="btn btn-danger btn-sm shadow-sm ms-2" 
                @click="confirmDeleteUser(user.id)"
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
      users: [],
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user =>
        user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        
        // Inspect the structure of the response
        console.log('Response Data:', response.data);

        // Assuming response.data is an object with a "data" field containing the array
        this.users = Array.isArray(response.data) ? response.data : response.data.data;

        // Make sure users is an array before filtering
        if (!Array.isArray(this.users)) {
          console.error('Erreur: Les utilisateurs ne sont pas un tableau');
          return;
        }
        
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    },
    confirmDeleteUser(id) {
      if (window.confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
        this.deleteUser(id);
      }
    },
    async deleteUser(id) {
      try {
        await axios.delete(`http://localhost:3000/api/users/${id}`);
        this.fetchUsers(); // Refresh the user list
        alert('Utilisateur supprimé avec succès.');
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      }
    },
    searchUser() {
      console.log('Recherche d\'utilisateur:', this.searchQuery);
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
