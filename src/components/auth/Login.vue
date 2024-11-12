<template>
  <div class="login-container">
    <h2>Connexion</h2>
    
    <!-- Message d'alerte en cas d'erreur -->
    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>
    
    <form @submit.prevent="onSubmit">
      <label>Email:</label>
      <input v-model="email" type="email" required />
      
      <label>Mot de passe:</label>
      <input v-model="password" type="password" required />
      
      <button type="submit">Connexion</button>
    </form>

    <!-- Lien pour mot de passe oublié -->
    <p @click="forgotPassword" class="forgot-password-link">Mot de passe oublié ?</p>
  </div>
</template>

<script>
import { useAuthStore } from '/src/store/authStore';
import { ref, watch } from 'vue';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const authStore = useAuthStore();

    const onSubmit = async () => {
      try {
        // Supposons que authStore.login retourne une promesse
        await authStore.login(email.value, password.value);
        errorMessage.value = ''; // Réinitialiser l'erreur si la connexion réussit
      } catch (error) {
        errorMessage.value = "Identifiants incorrects. Veuillez réessayer.";
      }
    };

    const resetForm = () => {
      email.value = '';
      password.value = '';
    };

    const forgotPassword = () => {
      // Redirige vers une page de réinitialisation de mot de passe (tu peux personnaliser cette logique)
      // Par exemple, ouvrir une modale ou rediriger vers un autre composant
      alert("Réinitialisation du mot de passe. Cette fonctionnalité est à implémenter.");
    };

    // Watch pour l'état de l'authentification
    // watch(
    //   () => authStore.isAuthenticated,
    //   (newValue) => {
    //     if (newValue) {
    //       window.location.reload(); // Rafraîchir la page si authentification réussie
    //     } else {
    //       resetForm();
    //     }
    //   }
    // );

    return { email, password, onSubmit, errorMessage, forgotPassword };
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

/* Style pour le message d'alerte */
.alert {
  background-color: #e74c3c;
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  width: 100%;
  text-align: center;
}

/* Style pour le lien "Mot de passe oublié" */
.forgot-password-link {
  color: #ecf0f1;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 10px;
}
</style>
