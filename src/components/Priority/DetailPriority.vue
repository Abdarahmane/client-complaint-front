<template>
  <div class="detail-priority">
    <h2 class="text-center text-custom-dark">Détails de la Priorité</h2>
    <div v-if="priority" class="priority-info">
      <p><strong>Nom :</strong> <span>{{ priority.name }}</span></p>
    </div>
    <div class="d-flex justify-content-center mt-3">
      <button class="btn btn-outline-secondary" @click="goBack">
        <i class="fas fa-arrow-left"></i> Retour
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      priority: null, // Initialiser la priorité à null
    };
  },
  async created() {
    const id = this.$route.params.id; // Récupérer l'ID de l'URL
    try {
      const response = await axios.get(`http://localhost:3000/api/priorities/${id}`);
      this.priority = response.data; // Définir les données de la priorité
    } catch (error) {
      console.error('Erreur lors de la récupération des détails de la priorité:', error);
    }
  },
  methods: {
    goBack() {
      this.$router.push('/priority'); // Naviguer vers la liste des priorités
    }
  }
};
</script>

<style scoped>
.detail-priority {
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

.priority-info {
  font-size: 16px;
  color: #555555;
}

.priority-info p {
  margin: 10px 0;
}

.priority-info strong {
  color: #333333;
}

.btn-outline-secondary {
  border: none; /* Couleur de la bordure du bouton de retour */
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

.btn i {
  margin-right: 5px;
}
</style>
