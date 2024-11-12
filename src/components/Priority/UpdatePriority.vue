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
          required 
        />
      </div>
      <div class="d-flex justify-content-between">
        <button type="submit" class="btn btn-custom-primary">Enregistrer</button>
        <button type="button" class="btn btn-outline-secondary" @click="goBack">Retour</button>
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
    };
  },
  methods: {
    async fetchPriority() {
      try {
        const id = this.$route.params.id; // Récupérer l'ID des paramètres de la route
        const response = await axios.get(`http://localhost:3000/api/priorities/${id}`);
        this.priority = response.data; // Définir les données de priorité récupérées
      } catch (error) {
        console.error('Erreur lors de la récupération de la priorité:', error);
      }
    },
    async updatePriority() {
      try {
        const id = this.$route.params.id; // Récupérer l'ID des paramètres de la route
        const response = await axios.put(`http://localhost:3000/api/priorities/${id}`, this.priority);
        console.log('Priorité mise à jour:', response.data);

        // Rediriger vers la vue de la liste
        this.$router.push('/priority'); // Chemin corrigé pour la liste des priorités
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la priorité:', error);
      }
    },
    goBack() {
      this.$router.go(-1); // Retour à la page précédente
    }
  },
  mounted() {
    this.fetchPriority(); // Récupérer la priorité lors du montage du composant
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
  background-color: #007bff; /* Couleur de fond au survol */
  color: white; /* Couleur du texte au survol */
}
</style>
