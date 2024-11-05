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
        const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });

        if (!response.ok) {
          throw new Error('Invalid email or password');
        }

        const data = await response.json();
        localStorage.setItem('authToken', data.token); // Stocke le token JWT
        this.$router.push('/home'); // Redirige vers la page d'accueil
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
