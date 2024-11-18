<template>
  <div class="login-container">
    <h2>Mot de passe oublié</h2>

    <!-- Message d'alerte en cas d'erreur -->
    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>

    <!-- Message de succès -->
    <div v-if="successMessage" class="alert alert-success">
      {{ successMessage }}
    </div>

    <form @submit.prevent="onSubmit">
      <label>Email:</label>
      <input v-model="email" type="email" placeholder="Entrez votre email" required />

      <button type="submit">Envoyer</button>
    </form>

    <!-- Lien pour retourner à la page de connexion -->
    <p @click="goToLogin" class="forgot-password-link">Retour à la connexion</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '/src/store/authStore';

export default {
  setup() {
    const email = ref('');
    const errorMessage = ref('');
    const successMessage = ref('');
    const authStore = useAuthStore();
    const router = useRouter();

    const onSubmit = async () => {
      try {
        // Appel à l'action du store pour mot de passe oublié
        await authStore.forgotPassword(email.value);
        errorMessage.value = ''; // Réinitialiser les erreurs
        successMessage.value = 'Un lien de réinitialisation a été envoyé à votre adresse email.';
      } catch (error) {
        successMessage.value = ''; // Réinitialiser le message de succès
        errorMessage.value = error.response?.data?.message || "Erreur lors de l'envoi du lien de réinitialisation.";
      }
    };

    const goToLogin = () => {
      router.push({ name: 'Login' });
    };

    return { email, onSubmit, errorMessage, successMessage, goToLogin };
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #2c3e50;
  padding: 20px;
  border-radius: 10px;
  color: #ecf0f1;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  box-sizing: border-box;
}

label {
  margin-top: 10px;
  color: #ecf0f1;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
}

button {
  margin-top: 15px;
  padding: 10px 15px;
  background-color: #34495e;
  color: #ecf0f1;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
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

.forgot-password-link {
  color: #ecf0f1;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 10px;
}
</style>
