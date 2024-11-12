<template>
  <div class="update-category p-4 bg-custom-white rounded shadow-sm position-relative">
    <!-- Bouton de retour -->
    <router-link to="/category/list" class="btn btn-secondary back-button">
      <i class="fas fa-arrow-left"></i> Retour
    </router-link>

    <h3 class="text-custom-dark mb-4">Modifier une Catégorie</h3>
    <form @submit.prevent="updateCategory">
      <div class="mb-3">
        <label for="name" class="form-label text-custom-dark">Nom</label>
        <input 
          v-model="category.name" 
          id="name" 
          class="form-control shadow-sm" 
          placeholder="Entrez le nom de la catégorie" 
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
      category: { name: '' }, // Initialisation pour éviter une erreur dans v-model
    };
  },
  mounted() {
    this.fetchCategory(); // Charger la catégorie actuelle
  },
  methods: {
    async fetchCategory() {
      try {
        const response = await axios.get(`http://localhost:3000/api/categories/${this.$route.params.id}`);
        this.category = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération de la catégorie:", error);
      }
    },
    async updateCategory() {
      try {
        await axios.put(`http://localhost:3000/api/categories/${this.$route.params.id}`, this.category);
        this.$router.push('/category/list'); // Redirection après la mise à jour
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la catégorie:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Styles alignés avec AddCategory.vue */
.update-category {
  max-width: 500px;
  margin: 30px auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
}

.bg-custom-white {
  background-color: #f8f9fa;
}

.text-custom-dark {
  color: #343a40;
}

.btn-custom-primary {
  background-color: #007bff;
  color: white;
  border: none;
}

.btn-secondary {
  background-color: #007bff;
  color: white;
  border: none;
}

.back-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.shadow-sm {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.form-control {
  border: 1px solid #ced4da;
  transition: border-color 0.3s;
}

.form-control:focus {
  border-color: #007bff;
}

h3 {
  font-weight: bold;
}
</style>
