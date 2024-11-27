<template>
  <div class="login-container">
    <h2>Connexion</h2>

    <!-- Message d'erreur -->
    <div v-if="errorMessage" class="alert alert-danger">
      {{ authStore.message }}
    </div>

    <!-- Message de succès -->
    <div v-if="successMessage" class="alert alert-success">
      {{ authStore.message }}
    </div>

    <form @submit.prevent="onSubmit">
      <label>Email :</label>
      <input v-model="email" type="email" placeholder="Entrez votre email" required />

      <label>Mot de passe :</label>
      <div class="password-container">
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Entrez votre mot de passe"
          required
        />
        <span class="toggle-password" @click="togglePassword">
          <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
        </span>
      </div>

      <button type="submit" :disabled="authStore.isLoading">
        <span v-if="authStore.isLoading">Chargement...</span>
        <span v-else>Connexion</span>
      </button>
    </form>

    <p @click="forgotPassword" class="forgot-password-link">Mot de passe oublié ?</p>
  </div>
</template>


<script>
import { useAuthStore } from '/src/store/authStore';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const showPassword = ref(false); // État pour contrôler l'affichage du mot de passe
    const authStore = useAuthStore();
    const router = useRouter();

    // Calcul des messages d'erreur et de succès
    const errorMessage = computed(() => authStore.message && authStore.message.includes('Erreur'));
    const successMessage = computed(() => authStore.message && authStore.message.includes('Connexion réussie'));

    // Soumission du formulaire
    const onSubmit = async () => {
      // Réinitialiser les messages précédents avant chaque soumission
      authStore.message = '';

      try {
        await authStore.login(email.value, password.value);

        // Si la connexion est réussie, réinitialiser le formulaire
        if (authStore.isAuthenticated) {
          email.value = '';
          password.value = '';
        }
      } catch (error) {
        console.error('Erreur lors de la soumission du formulaire :', error);
      }
    };

    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };

    const forgotPassword = () => {
      router.push({ name: 'ForgotPassword' });
    };

    return { email, password, showPassword, onSubmit, errorMessage, successMessage, togglePassword, forgotPassword, authStore };
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
  padding-right: 40px; /* Espace pour l'icône */
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #bdc3c7;
}

.password-container {
  position: relative;
  width: 100%;
}

.toggle-password {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #7f8c8d;
}

.toggle-password:hover {
  color: #34495e;
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

.forgot-password-link {
  color: #ecf0f1;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 10px;
}
</style>
