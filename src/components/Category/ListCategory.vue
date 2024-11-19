<template>
  <div class="list-category p-4 bg-custom-white rounded shadow-container">
   <h2 class="text-center mb-4 text-custom-dark">Liste des Categories</h2>

    <div class="d-flex justify-content-between align-items-center mb-4">
      <router-link to="/category/add" class="btn btn-success shadow-sm btn-add">
        <i class="fas fa-plus"></i> Ajouter une Catégorie
      </router-link>
      <div class="d-flex align-items-center">
        <input 
          type="text" 
          v-model="searchQuery" 
          class="form-control me-2 rounded-pill shadow-sm" 
          placeholder="Rechercher une catégorie..." 
          style="width: 350px;"
        />
        
      </div>
    </div>

    <div class="table-responsive custom-table">
      <table class="table table-hover table-striped align-middle shadow-sm">
        <thead class="bg-primary text-white">
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in filteredCategories" :key="category.id">
            <td>{{ category.id }}</td>
            <td>{{ category.name }}</td>
            <td>
              <router-link 
                :to="`/home/category/detail/${category.id}`" 
                class="btn btn-primary btn-sm shadow-sm"
              >
                <i class="fas fa-eye"></i> 
              </router-link>
              <router-link 
                :to="`/home/category/update/${category.id}`" 
                class="btn btn-info btn-sm shadow-sm ms-2"
              >
                <i class="fas fa-edit"></i> 
              </router-link>
              <button 
                class="btn btn-danger btn-sm shadow-sm ms-2" 
                @click="confirmDeleteCategory(category.id)"
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
      categories: [],
    };
  },
  computed: {
    filteredCategories() {
      return this.categories.filter(category =>
        category.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get('http://localhost:3000/api/categories');
        this.categories = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    },
    confirmDeleteCategory(id) {
      if (window.confirm('Voulez-vous vraiment supprimer cette catégorie ?')) {
        this.deleteCategory(id);
      }
    },
    async deleteCategory(id) {
      try {
        await axios.delete(`http://localhost:3000/api/categories/${id}`);
        this.fetchCategories();
        alert('Catégorie supprimée avec succès.');
      } catch (error) {
        console.error('Erreur lors de la suppression de la catégorie:', error);
      }
    },
    searchCategory() {
      console.log('Recherche de catégorie:', this.searchQuery);
    },
  },
};
</script>
<style scoped>
.list-category {
  max-width: 80%; /* Augmente la largeur du conteneur pour occuper toute la largeur disponible */
  margin: 0 auto;
}
.table th, .table td {
  padding: 8px; /* Diminue la hauteur des lignes */
  text-align: center;
  vertical-align: middle;
}
.table-hover tbody tr:hover {
  background-color: #f8f9fa;
}
.btn-add {
  padding: 8px 12px;
  font-size: 0.9rem;
}
.custom-table {
  max-height: 400px; /* Diminue la hauteur maximale */
  overflow-y: auto;
}
h2 {
  font-weight: bold;
  font-size: 1.5rem; /* Ajuste la taille du titre */
}
.shadow-sm {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.shadow-container {
  background-color: #f8f9fa;
  width: 80%; /* Largeur à 80% */
  margin: 0 auto; /* Centrer le conteneur */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Ombre autour du conteneur */
}
</style>
