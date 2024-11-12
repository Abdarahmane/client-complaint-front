<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="card shadow-sm p-4" style="max-width: 500px; width: 100%;  background-color: #f8f9fa;">
      <h3 class="text-center mb-4">Ajouter un User</h3>

      <form @submit.prevent="addUser">
        <div class="mb-3">
          <label for="name" class="form-label">Nom</label>
          <input v-model="user.name" type="text" id="name" class="form-control" placeholder="Entrez le nom" required />
        </div>

        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input v-model="user.email" type="email" id="email" class="form-control" placeholder="Entrez un email valide" required />
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Mot de passe</label>
          <input v-model="user.password" type="password" id="password" class="form-control" placeholder="Entrez le mot de passe" required />
        </div>

        <div class="mb-3">
          <label for="role" class="form-label">Rôle</label>
          <select v-model="user.role" id="role" class="form-select" required>
            <option value="" disabled>Choisissez un rôle</option>
            <option value="admin">Administrateur</option>
            <option value="employer">Employé</option>
          </select>
        </div>

        <!-- Boutons d'action -->
        <div class="d-flex justify-content-between mt-4">
          <button type="submit" class="btn btn-primary">
            <i class="fas fa-save"></i> Enregistrer
          </button>
          <button type="button" class="btn btn-primary" @click="goBack">
            <i class="fas fa-arrow-left"></i> Retour
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  data() {
    return {
      user: { name: '', email: '', password: '', role: '' }
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async addUser() {
      try {
        await axios.post('http://localhost:3000/api/users', this.user);
        
        this.resetForm();
        this.router.push('/user/list');
      } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur :', error.response ? error.response.data : error.message);
      }
    },
    resetForm() {
      this.user = { name: '', email: '', password: '', role: '' };
    },
    goBack() {
      this.router.push('/user/list');
    }
  }
};
</script>

<style scoped>
.container {
  min-height: 100vh; 
}

.card {
  border-radius: 10px;
}

.text-center {
  color: #333;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
}

.btn-primary {
  background-color: #007bff;
  border: none;
}

.btn-outline-secondary {
  border: 1px solid #007bff;
  color: #007bff;
}

.btn-outline-secondary:hover {
  background-color: #007bff;
  color: #fff;
}
</style>
