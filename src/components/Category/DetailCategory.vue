<template>
  <div class="detail-category p-4 bg-custom-light rounded shadow-sm">
    <h3 class="text-custom-dark mb-4">Détails de la Catégorie</h3>
    <div v-if="category">
      <div class="category-details">
        <p class="mb-2">
          <strong class="text-custom-dark">Nom :</strong> 
          <span class="text-muted">{{ category.name }}</span>
        </p>
        <p class="mb-2">
          <strong class="text-custom-dark">ID :</strong> 
          <span class="text-muted">{{ category.id }}</span>
        </p>
      </div>
      <button 
        class="btn btn-custom-secondary mt-3 shadow-sm" 
        @click="goBack">
        <i class="fas fa-arrow-left"></i> Retour
      </button>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      category: null,
    };
  },
  mounted() {
    this.fetchCategory();
  },
  methods: {
    async fetchCategory() {
      try {
        const response = await axios.get(`http://localhost:3000/api/categories/${this.$route.params.id}`);
        this.category = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération de la catégorie:', error);
      }
    },
    goBack() {
      this.$router.push('/category/list'); // Redirige vers la liste des catégories
    },
  },
};
</script>

<style scoped>
/* Styles pour le composant DetailCategory avec des couleurs personnalisées */
.bg-custom-light {
  background-color: #ffffff;
}
.text-custom-dark {
  color: #343a40;
}
.text-muted {
  color: #6c757d;
}
.btn-custom-secondary {
  background-color: #6c757d;
  color: white;
  border: none;
}
.shadow-sm {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
h3 {
  font-weight: bold;
}
.category-details {
  font-size: 16px;
}
.btn {
  transition: background-color 0.3s;
}
.btn:hover {
  background-color: #5a6268;
}
</style>
