<template>
  <div class="list-user p-4 bg-custom-white rounded shadow-container">
    <h2 class="text-center mb-4 text-custom-dark">Liste des Utilisateurs</h2>

    <!-- Barre de recherche et ajout d'utilisateur (visible uniquement pour Admin) -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
      <router-link 
        v-if="auth.userRole === 'admin'"

        to="/user/add" 
        class="btn btn-success shadow-sm mb-2 mb-md-0"
      >
        <i class="fas fa-plus"></i> Ajouter un Utilisateur
      </router-link>
      <div class="input-group" style="max-width: 400px;">
        <input 
          type="text" 
          v-model="searchQuery" 
          class="form-control rounded-pill shadow-sm" 
          placeholder="Rechercher un utilisateur..."
        />
        
      </div>
    </div>

    <!-- Table des utilisateurs -->
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
            <td class="d-flex justify-content-center">
              <!-- Bouton Détails -->
              <router-link 
                :to="`/home/user/detail/${user.id}`" 
                class="btn btn-primary btn-sm shadow-sm me-2"
              >
                <i class="fas fa-eye"></i>
              </router-link>

              <!-- Bouton Modifier (visible uniquement pour Admin) -->
              <router-link 
                v-if="auth.userRole === 'admin'"

                :to="`/home/user/update/${user.id}`" 
                class="btn btn-info btn-sm shadow-sm me-2"
              >
                <i class="fas fa-edit"></i>
              </router-link>

              <!-- Bouton Supprimer (visible uniquement pour Admin) -->
              <button 
                v-if="auth.userRole === 'admin'"

                class="btn btn-danger btn-sm shadow-sm" 
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
import { useAuthStore } from '/src/store/authStore';

export default {
  data() {
    return {
      searchQuery: '',
      users: [],
    };
  },
  computed: {
    auth() {
      return useAuthStore();
    },
    filteredUsers() {
      return this.users.filter(user =>
        user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        this.users = Array.isArray(response.data) ? response.data : response.data.data;
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
        this.fetchUsers();
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
.table th,
.table td {
  text-align: center;
  vertical-align: middle;
}
.table-hover tbody tr:hover {
  background-color: #f8f9fa;
}
.shadow-sm {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
h2 {
  font-weight: bold;
}
.table-responsive {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.shadow-container {
  width: 90%;
  margin: 0 auto;
}
</style>
