<template>
  <div class="add-category p-4 bg-custom-white rounded shadow-sm position-relative">
    <!-- Bouton de retour -->
    <router-link to="/category/list" class="btn btn-secondary back-button">
      <i class="fas fa-arrow-left"></i> Retour
    </router-link>

    <h3 class="text-custom-dark mb-4">Ajouter une Catégorie</h3>
    <form @submit.prevent="addCategory">
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
        <i class="fas fa-plus"></i> Ajouter
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      category: { name: '' },
    };
  },
  methods: {
    async addCategory() {
      try {
        const newCategory = { name: this.category.name };
        await axios.post('http://localhost:3000/api/categories', newCategory);

        this.category.name = ''; // Réinitialisez le champ
        this.$router.push('/category/list'); // Redirige vers la liste des catégories
      } catch (error) {
        console.error("Erreur lors de l'ajout de la catégorie:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Styles pour le composant AddCategory avec des couleurs personnalisées */
.add-category {
  max-width: 500px;
  margin: 30px auto;
  padding: 20px;
  background-color: #f8f9fa; /* Couleur de fond personnalisée */
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
  background-color: #007bff; /* Couleur pour le bouton retour */
  color: white;
  border: none;
}

/* Style pour le bouton de retour aligné en bas à droite */
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
