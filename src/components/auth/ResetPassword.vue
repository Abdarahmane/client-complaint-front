<template>
  <div class="container">
    <h2>Réinitialiser le mot de passe</h2>
    <form @submit.prevent="resetPassword">
      <div class="form-group">
        <label for="password">Nouveau mot de passe</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="form-control"
          placeholder="Entrez votre nouveau mot de passe"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Réinitialiser</button>
    </form>
    <p v-if="message" :class="{'text-success': success, 'text-danger': !success}">
      {{ message }}
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      password: "",
      message: "",
      success: false,
    };
  },
  methods: {
    async resetPassword() {
      const token = this.$route.params.token; // Récupérer le token depuis l'URL
      try {
        const response = await axios.post(`http://localhost:3000/api/reset-password/${token}`, {
          password: this.password,
        });
        this.message = response.data.message;
        this.success = true;

        // Rediriger vers la page de connexion après 2 secondes
        setTimeout(() => {
          this.$router.push("/login");
        }, 2000);
      } catch (error) {
        this.message = error.response?.data?.message || "Une erreur est survenue.";
        this.success = false;
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 50px auto;
}
</style>
