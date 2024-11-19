<template>
  <div class="container">
    <h2>Mot de passe oublié</h2>
    <form @submit.prevent="submitEmail">
      <div class="form-group">
        <label for="email">Adresse e-mail</label>
        <input
          type="email"
          id="email"
          v-model="email"
          class="form-control"
          placeholder="Entrez votre e-mail"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Envoyer</button>
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
      email: "",
      message: "",
      success: false,
    };
  },
  methods: {
    async submitEmail() {
      try {
        const response = await axios.post("http://localhost:3000/api/forgot-password", { email: this.email });
        this.message = response.data.message;
        this.success = true;
      } catch (error) {
        this.message = error.response?.data?.error || "Une erreur est survenue.";
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
