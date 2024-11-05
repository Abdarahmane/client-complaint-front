<template>
  <div class="detail-client">
    <h2>Détails du Client</h2>
    <div class="client-info">
      <p><strong>Nom :</strong> <span>{{ client.name }}</span></p>
      <p><strong>Email :</strong> <span>{{ client.email }}</span></p>
      <p><strong>Téléphone :</strong> <span>{{ client.phone }}</span></p>
      <p><strong>Adresse :</strong> <span>{{ client.address }}</span></p>
    </div>
    <button class="btn btn-primary mt-3" @click="goBack">
      <i class="fas fa-arrow-left"></i> Retour
    </button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      client: {
        name: '',
        email: '',
        phone: '',
        address: ''
      }
    };
  },
  mounted() {
    this.fetchClientDetails();
  },
  methods: {
    async fetchClientDetails() {
      try {
        const response = await axios.get(`http://localhost:3000/api/clients/${this.$route.params.id}`);
        this.client = response.data; // Supposant que la réponse contient l'objet client
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du client:', error);
      }
    },
    goBack() {
      this.$router.push('/client/list'); // Retourne à la liste des clients
    }
  }
};
</script>

<style scoped>
/* Styles spécifiques pour le composant DetailClient */
.detail-client {
  max-width: 400px;
  margin: 10px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
}

h2 {
  text-align: center;
  margin-bottom: 15px;
  color: #333333;
}

.client-info {
  font-size: 16px;
  color: #555555;
}

.client-info p {
  margin: 10px 0;
}

.client-info strong {
  color: #333333;
}

.btn-primary {
  display: block;
  width: 100%;
  font-size: 1rem;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  padding: 8px;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn i {
  margin-right: 5px;
}
</style>
