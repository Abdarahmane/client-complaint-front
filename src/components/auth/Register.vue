<!-- src/components/auth/Register.vue -->
<template>
  <div class="register-form p-4 bg-light rounded shadow-sm">
    <h2 class="text-center mb-4">Inscription</h2>
    <form @submit.prevent="handleRegister">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" v-model="email" id="email" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Mot de passe</label>
        <input type="password" v-model="password" id="password" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">S'inscrire</button>
      <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import { apiService } from '../../services/apiService';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
    };
  },
  methods: {
    async handleRegister() {
      try {
        await apiService.register(this.email, this.password);
        this.$router.push('/login'); // Redirige vers la page de connexion après l'inscription
      } catch (error) {
        this.error = error.message;
      }
    }
  }
};
</script>

<style scoped>
.register-form {
  max-width: 400px;
  margin: auto;
}
</style>
