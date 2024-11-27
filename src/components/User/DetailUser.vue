<template>
  <div class="detail-user">
    <h2>Détails de l'Utilisateur</h2>
    
    <div class="user-info" v-if="user">
      <form class="row d-flex flex-column">
        <div class="col-md-6 form-group">
          <label class="form-label">ID</label>
          <p>{{ user.id }}</p>
        </div>
        <div class="col-md-6 form-group">
          <label class="form-label">Nom</label>
          <p>{{ user.name }}</p>
        </div>
        <div class="col-md-6 form-group">
          <label class="form-label">Email</label>
          <p>{{ user.email }}</p>
        </div>
        <div class="col-md-6 form-group">
          <label class="form-label">Rôle</label>
          <p>{{ user.role }}</p>
        </div>

        <!-- Bouton centré en bas -->
        <div class="col-12 text-center mt-auto">
          <button @click="goBack" class="btn btn-outline-primary mb-4">
            <i class="fas fa-arrow-left"></i> Retour
          </button>
        </div>
      </form>
    </div>
    
    <!-- Afficher un message de chargement si l'utilisateur n'est pas encore chargé -->
    <div v-else>
      <p>Chargement des détails...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';

export default {
  data() {
    return {
      user: null, // L'utilisateur sera initialisé à null
      loading: true // Indicateur de chargement
    };
  },
  methods: {
    async fetchUser() {
  const userId = this.$route.params.id;
  const auth = useAuthStore();
  try {
    const response = await axios.get(`http://localhost:3000/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    });
    this.user = response.data.data; // Extraire les données utilisateur de l'objet `data`
    this.loading = false; // Passer à false une fois les données récupérées
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de l’utilisateur:', error);
    this.loading = false;
  }
}
,
    goBack() {
      this.$router.push('/user/list');
    }
  },
  created() {
    this.fetchUser(); // Récupérer les données utilisateur au moment de la création du composant
  }
};
</script>

<style scoped>
.detail-user {
  max-width: 500px;
  margin: 30px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 24px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.user-info {
  font-size: 16px;
  color: #555;
  line-height: 1.6;
}

.user-info .form-group {
  margin-bottom: 15px;
}

.form-label {
  font-size: 18px; /* Augmenter la taille de la police des labels */
  font-weight: 600;
  color: #6c757d; /* Gris pour les titres */
}

p {
  font-size: 16px;
  color: #333;
}

.btn {
  background-color: #5c85d6;
  border: none;
  color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  width: auto;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #486cb0;
}

.btn-outline-secondary {
  background-color: transparent;
  border: 1px solid #5c85d6;
  color: #5c85d6;
  padding: 10px 20px;
  cursor: pointer;
}

.btn-outline-secondary:hover {
  background-color: #5c85d6;
  color: white;
}

.mb-4 {
  margin-bottom: 1.5rem;
}

.text-center {
  margin-bottom: 20px;
}
</style>
