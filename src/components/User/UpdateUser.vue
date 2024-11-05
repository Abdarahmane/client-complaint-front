<template>
  <div class="update-user">
    <h2>Modifier un Utilisateur</h2>
    <!-- Bouton de retour -->
    <button @click="goBack" class="btn btn-outline-secondary mb-4">
      <i class="fas fa-arrow-left"></i> Retour
    </button>
    
    <form @submit.prevent="updateUser">
      <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input v-model="user.email" type="email" id="email" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="password" class="form-label">Mot de passe</label>
        <input v-model="user.password" type="password" id="password" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="role" class="form-label">Rôle</label>
        <select v-model="user.role" id="role" class="form-control" required>
          <option value="" disabled>Choisissez un rôle</option>
          <option value="admin">Administrateur</option>
          <option value="employer">Employé</option>
        </select>
      </div>
      <button type="submit" class="btn">Enregistrer</button>
    </form>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  data() {
    return {
      user: { id: '', email: '', password: '', role: '' }
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async updateUser() {
      try {
        const response = await axios.put(`http://localhost:3000/api/users/${this.user.id}`, this.user);
        console.log('Utilisateur mis à jour avec succès:', response.data);
        this.router.push('/user/list'); // Redirection vers la liste des utilisateurs
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error.response ? error.response.data : error.message);
      }
    },
    async fetchUser(userId) {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
        this.user = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error.response ? error.response.data : error.message);
      }
    },
    goBack() {
      this.router.push('/user/list'); // Navigation vers la liste des utilisateurs
    }
  },
  created() {
    const userId = this.$route.params.id;
    this.fetchUser(userId);
  }
};
</script>

<style scoped>
.update-user {
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

.form-group {
  margin-bottom: 15px;
}

.form-label {
  font-size: 14px;
  font-weight: 600;
  color: #555;
}

.form-control {
  background-color: #fff;
  border: 1px solid #ccc;
  color: #333;
  padding: 10px;
  border-radius: 4px;
  width: 100%;
  transition: border-color 0.3s;
}

.form-control:focus {
  outline: none;
  border-color: #5c85d6;
  box-shadow: 0 0 8px rgba(92, 133, 214, 0.2);
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
  width: 100%;
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
  width: auto;
}

.btn-outline-secondary:hover {
  background-color: #5c85d6;
  color: white;
}
</style>
