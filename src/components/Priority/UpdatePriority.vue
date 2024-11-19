<template>
  <div class="update-priority">
    <h2 class="text-center text-custom-dark">Modifier une Priorité</h2>
    <form @submit.prevent="updatePriority" class="form-container">
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
        <button type="submit" class="btn btn-custom-primary">Enregistrer</button>
        <button type="button" class="btn btn-outline-secondary" @click="goBack">Annuler</button>
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
      priority: { name: '' }, // Stockage des données de la priorité
      errors: {}, // Stockage des erreurs
    };
  },
  mounted() {
    this.fetchPriority();
  },
  methods: {
    async fetchPriority() {
      try {
        const { id } = this.$route.params; // Récupération de l'ID depuis l'URL
        const response = await axios.get(`http://localhost:3000/api/priorities/${id}`);
        this.priority = response.data;
      } catch (error) {
        this.handleError(error, 'Impossible de charger la priorité.');
      }
    },
    async updatePriority() {
      // Réinitialiser les erreurs
      this.errors = {};

      // Validation des champs
      if (!this.priority.name.trim()) {
        this.errors.name = "Le champ 'Nom' ne doit pas être vide.";
        return; // Arrêter l'exécution si la validation échoue
      }

      try {
        const { id } = this.$route.params;
        await axios.put(`http://localhost:3000/api/priorities/${id}`, this.priority);
        this.$router.push('/priority'); // Redirection après la mise à jour
      } catch (error) {
        this.handleError(error);
      }
    },
    goBack() {
      this.$router.go(-1); // Retour à la page précédente
    },
    handleError(error, defaultMessage = "Une erreur inattendue s'est produite.") {
      this.errors = {}; // Réinitialiser les erreurs

      if (error.response) {
        const { status, data } = error.response;

        // Gestion des erreurs de validation
        if (status === 400 && data.errors) {
          data.errors.forEach(err => {
            this.errors[err.param] = err.msg; // Associer chaque champ à son erreur
          });
        } else if (status === 409) {
          // Erreur de conflit (exemple : doublon)
          this.errors.name = data.error;
        } else {
          // Autres erreurs serveur
          this.errors.general = data.error || defaultMessage;
        }
      } else {
        // Erreurs réseau ou autres
        this.errors.general = "Impossible de communiquer avec le serveur.";
      }
    },
  },
};
</script>

<style scoped>
.update-priority {
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
  border: 1px solid #007bff; /* Couleur de la bordure du bouton de retour */
  color: white; /* Couleur du texte du bouton de retour */
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  background-color: #007bff;
}

.btn-outline-secondary:hover {
  background-color: #0056b3; /* Couleur de fond au survol */
  color: white; /* Couleur du texte au survol */
}
</style>
