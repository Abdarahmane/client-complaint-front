<template>
  <div class="list-user p-4 bg-custom-white rounded shadow-sm">
    <h2 class="text-center mb-4 text-custom-dark">Liste des Utilisateurs</h2>

    <!-- Bouton d'ajout et barre de recherche -->
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
          style="width: 300px;"
        />
        <button class="btn btn-outline-secondary shadow-sm" @click="searchUser">
          <i class="fas fa-search"></i>
        </button>
      </div>
    </div>

    <!-- Tableau des utilisateurs -->
    <div class="table-responsive">
      <table class="table table-striped table-hover align-middle">
        <thead class="bg-custom-dark text-white">
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td class="text-center">
              <router-link 
                :to="`/user/detail/${user.id}`" 
                class="btn btn-sm btn-custom-info shadow-sm"
              >
                <i class="fas fa-eye"></i> 
              </router-link>
              <router-link 
                :to="`/user/update/${user.id}`" 
                class="btn btn-sm btn-custom-info shadow-sm ms-2"
              >
                <i class="fas fa-edit"></i>
              </router-link>
              <button 
                class="btn btn-sm btn-custom-danger shadow-sm ms-2" 
                @click="confirmDelete(user.id)"
              >
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Confirmation Modal -->
    <div v-if="showConfirmModal" class="modal fade show" tabindex="-1" role="dialog" style="display: block;">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmation de Suppression</h5>
            <button type="button" class="close" @click="showConfirmModal = false">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showConfirmModal = false">Annuler</button>
            <button type="button" class="btn btn-danger" @click="deleteUser(confirmedUserId)">Supprimer</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showConfirmModal" class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchQuery: '',
      users: [],
      showConfirmModal: false,
      confirmedUserId: null // ID de l'utilisateur à confirmer pour la suppression
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user =>
        (user.name ? user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) : false) ||
        user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        this.users = Array.isArray(response.data.data) ? response.data.data : [];
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    },
    searchUser() {
      this.searchQuery = this.searchQuery.trim();
    },
    confirmDelete(id) {
      this.confirmedUserId = id; // Stocker l'ID de l'utilisateur à supprimer
      this.showConfirmModal = true; // Afficher la modal de confirmation
    },
    async deleteUser(id) {
      try {
        await axios.delete(`http://localhost:3000/api/users/${id}`);
        this.users = this.users.filter(user => user.id !== id);
        this.showConfirmModal = false; // Fermer la modal après suppression
        console.log(`Utilisateur avec ID ${id} supprimé.`);
      } catch (error) {
        console.error(`Erreur lors de la suppression de l'utilisateur avec ID ${id}:`, error);
      }
    }
  },
  created() {
    this.fetchUsers();
  }
};
</script>

<style scoped>
/* Styles pour le composant ListUser avec vos couleurs personnalisées */
.bg-custom-white {
  background-color: #f8f9fa; /* Blanc cassé */
}
.text-custom-dark {
  color: #343a40; /* Gris foncé */
}
.bg-custom-dark {
  background-color: #343a40; /* Gris foncé pour l'en-tête */
}
.btn-custom-info {
  background-color: #17a2b8; /* Bleu clair */
  color: white;
  border: none; /* Pas de bordure */
}
.btn-custom-danger {
  background-color: #dc3545; /* Rouge pour supprimer */
  color: white;
  border: none; /* Pas de bordure */
}
.table th, .table td {
  text-align: center;
}
.table-hover tbody tr:hover {
  background-color: #e9ecef; /* Gris clair pour le survol */
}
.shadow-sm {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
h2 {
  font-weight: bold;
}
.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.5); /* Arrière-plan semi-transparent */
}
</style>
