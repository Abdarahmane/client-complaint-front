<template>
  <div class="add-priority">
    <h2 class="text-center text-custom-dark">Ajouter une Priorité</h2>
    <form @submit.prevent="addPriority" class="form-container">
      <div class="mb-4">
        <label for="name" class="form-label">Nom</label>
        <input 
          v-model="priority.name" 
          type="text" 
          id="name" 
          class="form-control" 
          placeholder="Entrez le nom de la priorité" 
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
      priority: { name: '' },
      errors: {}, // Stockage des erreurs
    };
  },
  methods: {
    async addPriority() {
      try {
        // Réinitialiser les erreurs avant d'envoyer la requête
        this.errors = {};

        // Appel à l'API pour ajouter une priorité
        const response = await axios.post('http://localhost:3000/api/priorities', this.priority);
        console.log('Priorité ajoutée:', response.data);

        // Réinitialiser le champ du formulaire
        this.priority.name = '';

        // Rediriger vers la liste des priorités
        this.$router.push('/priority'); // Ajustez la route si nécessaire
      } catch (error) {
        if (error.response) {
          const { status, data } = error.response;

          // Gestion des erreurs spécifiques
          if (status === 409) {
            this.errors.name = data.error; // Message: "Une priorité avec ce nom existe déjà."
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
.add-priority {
  max-width: 500px;
  margin: 30px auto;
  padding: 20px;
  background-color: #f8f9fa; /* Couleur de fond personnalisée */
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.text-custom-dark {
  color: #343a40; /* Couleur personnalisée pour le texte */
}

.form-container {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-weight: 600;
  color: #555;
}

.form-control {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  transition: border-color 0.3s;
}

.form-control:focus {
  border-color: #007bff; /* Couleur de bordure sur le focus */
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.btn-custom-primary {
  background-color: #007bff; /* Couleur du bouton */
  border: none;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-custom-primary:hover {
  background-color: #0056b3; /* Couleur du bouton au survol */
}

.btn-outline-secondary {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s, color 0.3s;
}

.btn-outline-secondary:hover {
  background-color: #007bff; /* Couleur de fond au survol */
  color: white; /* Couleur du texte au survol */
}
</style>
