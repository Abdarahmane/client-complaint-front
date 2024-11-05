<template>
  <div class="update-category p-4 bg-custom-white rounded shadow-sm position-relative">
    <!-- Bouton de retour -->
    <router-link to="/category/list" class="btn btn-secondary position-absolute" style="top: 20px; right: 20px;">
      <i class="fas fa-arrow-left"></i> Retour
    </router-link>

    <h2 class="text-custom-dark mb-4">Modifier une Catégorie</h2>
    <form @submit.prevent="updateCategory">
      <div class="mb-3">
        <label for="name" class="form-label text-custom-dark">Nom</label>
        <input 
          v-model="category.name" 
          type="text" 
          id="name" 
          class="form-control shadow-sm" 
          placeholder="Entrez le nouveau nom de la catégorie" 
          required 
        />
      </div>
      <button type="submit" class="btn btn-custom-primary shadow-sm">
        <i class="fas fa-save"></i> Enregistrer
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      category: { name: '' }
    };
  },
  mounted() {
    this.fetchCategory();
  },
  methods: {
    async fetchCategory() {
      try {
        const response = await axios.get(`http://localhost:3000/api/categories/${this.$route.params.id}`);
        this.category = response.data; // Assuming the response data is the category object
      } catch (error) {
        console.error('Erreur lors de la récupération de la catégorie:', error);
      }
    },
    async updateCategory() {
      try {
        await axios.put(`http://localhost:3000/api/categories/${this.$route.params.id}`, this.category);
        // Redirige vers la liste des catégories après la mise à jour
        this.$router.push('/category/list');
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la catégorie:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Styles pour le composant UpdateCategory */
.bg-custom-white {
  background-color: #f8f9fa; /* Fond blanc cassé */
}
.text-custom-dark {
  color: #343a40; /* Texte gris foncé */
}
.btn-custom-primary {
  background-color: #007bff; /* Bleu primaire */
  color: white;
  border: none;
}
.btn-secondary {
  background-color: #6c757d; /* Couleur pour le bouton retour */
  color: white;
  border: none;
}
.shadow-sm {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* Ombre légère */
}
.form-control {
  border: 1px solid #ced4da; /* Bordure gris clair */
  transition: border-color 0.3s;
}
.form-control:focus {
  border-color: #007bff; /* Couleur de bordure bleu primaire lorsqu'il est focalisé */
}
h2 {
  font-weight: bold;
}
</style>
