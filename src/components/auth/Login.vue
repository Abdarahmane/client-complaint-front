<!-- src/components/auth/Login.vue -->
<template>
  <div class="login-form p-4 bg-light rounded shadow-sm">
    <h2 class="text-center mb-4">Connexion</h2>
    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" v-model="email" id="email" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Mot de passe</label>
        <input type="password" v-model="password" id="password" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">Se connecter</button>
      <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
    </form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
    };
  },
  methods: {
    async handleLogin() {
      try {
        const data = await apiService.login(this.email, this.password);
        localStorage.setItem('authToken', data.token); // Stocke le token JWT
        this.$router.push('/dashboard'); // Redirige vers le tableau de bord
      } catch (error) {
        this.error = error.message;
      }
    }
  }
};
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: auto;
}
</style>
