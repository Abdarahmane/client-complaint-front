<template>
  <div class="detail-user">
    <h2>Détails de l'Utilisateur</h2>
    <div class="user-info" v-if="user">
      <p><strong>ID :</strong> <span>{{ user.id }}</span></p>
      <p><strong>Email :</strong> <span>{{ user.email }}</span></p>
      <p><strong>Rôle :</strong> <span>{{ user.role }}</span></p>
    </div>
    <button class="btn btn-secondary mt-3" @click="goBack">
      <i class="fas fa-arrow-left"></i> Retour
    </button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: null
    };
  },
  methods: {
    async fetchUser() {
      const userId = this.$route.params.id;
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
        this.user = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur:', error);
      }
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  created() {
    this.fetchUser();
  }
};
</script>

<style scoped>
.detail-user {
  max-width: 450px;
  margin: 30px auto;
  padding: 25px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 22px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.user-info {
  font-size: 16px;
  color: #555;
  line-height: 1.6;
}

.user-info p {
  margin: 12px 0;
}

.user-info strong {
  color: #333;
}

.btn-secondary {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #6c757d;
  border: none;
  color: #fff;
  border-radius: 5px;
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.btn i {
  margin-right: 8px;
}
</style>
