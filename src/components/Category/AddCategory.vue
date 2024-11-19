<template>
  <div class="add-category">
    <h2 class="text-center text-custom-dark">Ajouter une Catégorie</h2>
    <form @submit.prevent="addCategory" class="form-container">
      <div class="mb-4">
        <label for="name" class="form-label">Nom</label>
        <input 
          v-model="category.name" 
          type="text" 
          id="name" 
          class="form-control" 
          placeholder="Entrez le nom de la catégorie" 
          aria-label="Nom de la catégorie"
        />
        <!-- Affichage des erreurs liées au champ "name" -->
        <div v-if="errors.name" class="text-danger mt-1">
          {{ errors.name }}
        </div>
      </div>
      <div class="d-flex justify-content-between">
        <button type="submit" class="btn btn-custom-primary">Ajouter</button>
        <button type="button" class="btn btn-outline-secondary" @click="goBack">Retour</button>
      </div>
      <!-- Affichage des erreurs générales -->
      <div v-if="errors.general" class="text-danger mt-3">
        {{ errors.general }}
      </div>
    </form>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      category: { name: '' },
      errors: {}, // Stockage des erreurs
    };
  },
  methods: {
    async addCategory() {
      try {
        // Réinitialiser les erreurs avant d'envoyer la requête
        this.errors = {};

        // Appel à l'API pour ajouter une catégorie
        const response = await axios.post('http://localhost:3000/api/categories', this.category);
        console.log('Catégorie ajoutée:', response.data);

        // Réinitialiser le champ du formulaire
        this.category.name = '';

        // Rediriger vers la liste des catégories
        this.$router.push('/category'); // Ajustez la route si nécessaire
      } catch (error) {
        if (error.response) {
          const { status, data } = error.response;

          // Gestion des erreurs spécifiques
          if (status === 409) {
            this.errors.name = data.error; // Message: "Une catégorie avec ce nom existe déjà."
          } else if (status === 400) {
            // Gérer les erreurs de validation
            data.errors.forEach((err) => {
              if (err.param) {
                this.errors[err.param] = err.msg;
              } else {
                this.errors.general = err.msg || 'Une erreur inattendue est survenue.';
              }
            });
          } else {
            this.errors.general = 'Une erreur s\'est produite sur le serveur.';
          }
        } else {
          this.errors.general = 'Impossible de communiquer avec le serveur.';
        }
      }
    },
    goBack() {
      this.$router.go(-1); // Retour à la page précédente
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
