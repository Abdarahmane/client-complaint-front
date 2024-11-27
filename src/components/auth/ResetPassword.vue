<template>
  <div class="login-container">
    <h2>Réinitialiser le mot de passe</h2>

    <!-- Message d'erreur -->
    <div v-if="!success && message" class="alert alert-danger">
      {{ message }}
    </div>

    <!-- Message de succès -->
    <div v-if="success && message" class="alert alert-success">
      {{ message }}
    </div>

    <form @submit.prevent="resetPassword">
      <label>Nouveau mot de passe :</label>
      <input
        type="password"
        v-model="password"
        placeholder="Entrez votre nouveau mot de passe"
        required
      />

      <button type="submit" :disabled="isLoading">
        <span v-if="isLoading">Chargement...</span>
        <span v-else>Réinitialiser</span>
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  setup() {
    const password = ref("");
    const message = ref("");
    const success = ref(false);
    const isLoading = ref(false);
    const router = useRouter();

    const resetPassword = async () => {
      const token = router.currentRoute.value.params.token; // Récupérer le token depuis l'URL
      isLoading.value = true;
      message.value = "";

      try {
        const response = await axios.post(`http://localhost:3000/api/reset-password/${token}`, {
          password: password.value,
        });
        message.value = response.data.message;
        success.value = true;

        // Rediriger vers la page de connexion après 2 secondes
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } catch (error) {
        message.value = error.response?.data?.message || "Une erreur est survenue.";
        success.value = false;
      } finally {
        isLoading.value = false;
      }
    };

    return { password, message, success, isLoading, resetPassword };
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2c3e50;
  padding: 20px;
  border-radius: 10px;
  color: #ecf0f1;
  max-width: 400px;
  margin: 0 auto;
}

label {
  margin-top: 10px;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #bdc3c7;
}

button {
  margin-top: 15px;
  padding: 10px;
  background-color: #34495e;
  color: #ecf0f1;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

button:hover {
  background-color: #3b5998;
}

.alert {
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  width: 100%;
  text-align: center;
}

.alert-danger {
  background-color: #e74c3c;
  color: white;
}

.alert-success {
  background-color: #2ecc71;
  color: white;
}
</style>
