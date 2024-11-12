<template>
  <div class="detail-client p-4 bg-custom-white rounded shadow-sm">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="text-custom-dark">Détails du Client</h2>
      <!--  -->
    </div>
    <div class="client-info">
      <p><strong>Nom :</strong> <span>{{ client.name }}</span></p>
      <p><strong>Email :</strong> <span>{{ client.email }}</span></p>
      <p><strong>Téléphone :</strong> <span>{{ client.phone }}</span></p>
      <p><strong>Adresse :</strong> <span>{{ client.address }}</span></p>
    </div>
    <button class="btn btn-custom-primary mt-3" @click="goBack">
      <i class="fas fa-arrow-left"></i> Retour
    </button>
  </div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';

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
      const id = this.$route.params.id; // Récupérer l'ID du client depuis les paramètres de la route
      const auth = useAuthStore();
      try {
        const response = await axios.get(`http://localhost:3000/api/clients/${id}`, {
          headers: {
            Authorization: `Bearer ${auth.token}` // En-tête d'autorisation si nécessaire
          }
        });
        this.client = response.data; // Assumer que la réponse contient l'objet client
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du client:', error);
      }
    },
    goBack() {
      this.$router.push('/client/list'); // Retourner à la liste des clients
    }
  }
};
</script>

<style scoped>
.detail-client {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
   background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border: 1px solid #f8f9fa;
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

.btn-custom-primary {
  display: block;
  width: 100px; /* Ajuste la largeur selon tes préférences */
  margin: 20px auto; /* Centre le bouton horizontalement */
  font-size: 1rem;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s;
}


.btn-custom-primary:hover {
  background-color: #0056b3;
}

.btn i {
  margin-right: 5px;
}

.btn-custom-secondary {
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
}
</style>
