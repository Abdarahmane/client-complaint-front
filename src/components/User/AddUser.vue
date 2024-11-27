<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="card shadow-sm p-4" style="max-width: 500px; width: 100%; background-color: #f8f9fa;">
      <h3 class="text-center mb-4">Ajouter un Utilisateur</h3>

      <form @submit.prevent="addUser">
        <div class="mb-3">
          <label for="name" class="form-label">Nom</label>
          <input v-model="user.name" type="text" id="name" class="form-control" placeholder="Entrez le nom" required />
        </div>

        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input v-model="user.email" type="email" id="email" class="form-control" placeholder="Entrez un email valide" required />
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Mot de passe</label>
          <div class="password-container">
            <input
              v-model="user.password"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              class="form-control"
              placeholder="Entrez le mot de passe"
              required
            />
            <span class="toggle-password" @click="togglePassword">
              <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
            </span>
          </div>
        </div>

        <div class="mb-3">
          <label for="role" class="form-label">Rôle</label>
          <select v-model="user.role" id="role" class="form-select" required>
            <option value="" disabled>Choisissez un rôle</option>
            <option value="admin">Administrateur</option>
            <option value="employer">Employé</option>
          </select>
        </div>

        <div class="d-flex justify-content-between mt-4">
          <button type="submit" class="btn btn-primary">
            <i class="fas fa-save"></i> Enregistrer
          </button>
          <button type="button" class="btn btn-primary" @click="goBack">
            <i class="fas fa-arrow-left"></i> Retour
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importation de SweetAlert2

export default {
  data() {
    return {
      user: { name: '', email: '', password: '', role: '' },
      showPassword: false,
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async addUser() {
      try {
        await axios.post('http://localhost:3000/api/users', this.user);

        // Afficher une alerte de succès avec SweetAlert2
        Swal.fire({
          title: 'Succès!',
          text: 'Utilisateur ajouté avec succès.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          this.resetForm();
          this.router.push('/user/list');
        });
      } catch (error) {
        if (error.response && error.response.data) {
          const { message, details } = error.response.data;

          // Afficher une alerte d'erreur avec SweetAlert2
          Swal.fire({
            title: 'Erreur!',
            text: message || 'Une erreur est survenue.',
            icon: 'error',
            confirmButtonText: 'OK',
            footer: details
              ? `<ul>${details.map((err) => `<li>${err.field}: ${err.message}</li>`).join('')}</ul>`
              : null,
          });
        } else {
          Swal.fire({
            title: 'Erreur inattendue!',
            text: 'Veuillez réessayer.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      }
    },
    resetForm() {
      this.user = { name: '', email: '', password: '', role: '' };
    },
    goBack() {
      this.router.push('/user/list');
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style scoped>
.container {
  min-height: 100vh;
}
.card {
  border-radius: 10px;
}
.text-center {
  color: #333;
}
.password-container {
  position: relative;
}
.password-container .form-control {
  padding-right: 40px;
}
.toggle-password {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #6c757d;
}
.toggle-password:hover {
  color: #495057;
}
</style>
