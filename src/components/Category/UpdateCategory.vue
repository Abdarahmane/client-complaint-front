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
        />
        <!-- Afficher un message d'erreur si le champ est vide -->
        <div v-if="errors.name" class="text-danger mt-1">
          {{ errors.name }}
        </div>
      </div>
      <button type="submit" class="btn btn-custom-primary shadow-sm">
        <i class="fas fa-save"></i> Enregistrer
      </button>
    </form>
    <div v-if="errors.general" class="text-danger mt-3">
      {{ errors.general }}
    </div>
  </div>
</template>



<script>
import axios from 'axios';

export default {
  data() {
    return {
      category: { name: '' }, // Initialisation pour éviter une erreur dans v-model
      errors: {}, // Gestion des erreurs
    };
  },
  mounted() {
    this.fetchCategory(); // Charger la catégorie actuelle
  },
  methods: {
    // Récupérer les données actuelles de la catégorie
    async fetchCategory() {
      try {
        const response = await axios.get(`http://localhost:3000/api/categories/${this.$route.params.id}`);
        this.category = response.data;
      } catch (error) {
        this.errors.general = "Impossible de charger les données de la catégorie.";
        console.error("Erreur lors de la récupération de la catégorie:", error);
      }
    },
    // Mettre à jour la catégorie
    async updateCategory() {
  // Réinitialiser les erreurs
  this.errors = {};

  // Vérifier si le champ "name" est vide
  if (!this.category.name.trim()) {
    this.errors.name = "Le nom de la catégorie ne doit pas être vide.";
    return; // Empêcher l'envoi si le champ est invalide
  }

  // Vérifier si le champ "name" contient des chiffres
  const hasNumbers = /\d/; // Expression régulière pour détecter les chiffres
  if (hasNumbers.test(this.category.name)) {
    this.errors.name = "Le nom de la catégorie ne doit pas contenir de chiffres.";
    return; // Empêcher l'envoi si le champ est invalide
  }

  try {
    await axios.put(`http://localhost:3000/api/categories/${this.$route.params.id}`, this.category);
    this.$router.push('/category/list'); // Redirection après la mise à jour
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;

      // Gestion des erreurs spécifiques
      if (status === 400) {
        this.errors.name = data.error || "Erreur de validation.";
      } else if (status === 404) {
        this.errors.general = "La catégorie n'existe pas.";
      } else {
        this.errors.general = "Une erreur inattendue s'est produite.";
      }
    } else {
      this.errors.general = "Impossible de communiquer avec le serveur.";
    }
    console.error("Erreur lors de la mise à jour de la catégorie:", error);
  }
}

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
