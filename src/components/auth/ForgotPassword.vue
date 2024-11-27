<template>
  <div class="login-container">
    <h2>Mot de passe oublié</h2>

    <!-- Message d'erreur -->
    <div v-if="!success && message" class="alert alert-danger">
      {{ message }}
    </div>

    <!-- Message de succès -->
    <div v-if="success && message" class="alert alert-success">
      {{ message }}
    </div>

    <form @submit.prevent="submitEmail">
      <label>Adresse e-mail :</label>
      <input
        v-model="email"
        type="email"
        placeholder="Entrez votre adresse e-mail"
        required
      />

      <div class="button-container">
        <button type="submit" :disabled="isLoading">
          <span v-if="isLoading">Chargement...</span>
          <span v-else>Envoyer</span>
        </button>
        <button type="button" @click="cancel" class="cancel-button">Annuler</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const email = ref("");
    const message = ref("");
    const success = ref(false);
    const isLoading = ref(false);
    const router = useRouter();

    const submitEmail = async () => {
      isLoading.value = true;
      message.value = "";

      try {
        const response = await axios.post("http://localhost:3000/api/forgot-password", { email: email.value });
        message.value = response.data.message;
        success.value = true;
      } catch (error) {
        message.value = error.response?.data?.error || "Une erreur est survenue.";
        success.value = false;
      } finally {
        isLoading.value = false;
      }
    };

    const cancel = () => {
      router.push({ name: "Login" });
    };

    return { email, message, success, isLoading, submitEmail, cancel };
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

.button-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 15px;
}

button {
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

.cancel-button {
  background-color: #e74c3c;
}

.cancel-button:hover {
  background-color: #c0392b;
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
