<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="card shadow-sm p-4" style="max-width: 500px; width: 100%; background-color: #f8f9fa;">
      <h3 class="text-center mb-4">Modifier un Utilisateur</h3>

      <!-- Affichage d'un message d'erreur -->
      <div v-if="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>

      <!-- Affichage des détails des erreurs -->
      <div v-if="errorDetails.length" class="alert alert-danger">
        <ul>
          <li v-for="error in errorDetails" :key="error.field">
            {{ error.field }} : {{ error.message }}
          </li>
        </ul>
      </div>

      <!-- Affichage d'un indicateur de chargement -->
      <div v-if="isLoading" class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Chargement...</span>
        </div>
      </div>

      <!-- Formulaire -->
      <form v-else @submit.prevent="updateUser">
        <div class="mb-3">
          <label for="name" class="form-label">Nom</label>
          <input
            v-model="user.name"
            type="text"
            id="name"
            class="form-control"
            placeholder="Entrez le nom complet"
            required
            @input="validateName"
          />
        </div>

        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            v-model="user.email"
            type="email"
            id="email"
            class="form-control"
            placeholder="Entrez un email valide"
            required
          />
        </div>

        <div class="mb-3">
          <label for="role" class="form-label">Rôle</label>
          <select v-model="user.role" id="role" class="form-select" required>
            <option value="" disabled>Choisissez un rôle</option>
            <option value="admin">Administrateur</option>
            <option value="employer">Employé</option>
          </select>
        </div>

        <!-- Boutons d'action -->
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
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2"; // Importation de SweetAlert2

export default {
  data() {
    return {
      user: { id: "", name: "", email: "", role: "" }, // Données utilisateur
      isLoading: false, // Indicateur de chargement
      errorMessage: "", // Message d'erreur général
      errorDetails: [], // Détails des erreurs
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    validateName() {
      const nameRegex = /^[a-zA-Z\s]+$/;
      if (!nameRegex.test(this.user.name)) {
        this.errorMessage = "Le nom ne doit contenir que des lettres.";
      } else {
        this.errorMessage = "";
      }
    },
    async updateUser() {
      if (this.errorMessage) {
        Swal.fire({
          title: "Erreur",
          text: this.errorMessage,
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }

      try {
        const dataToUpdate = {
          name: this.user.name,
          email: this.user.email,
          role: this.user.role,
        };

        await axios.put(
          `http://localhost:3000/api/users/${this.user.id}`,
          dataToUpdate
        );

        // Utilisation de SweetAlert2 pour le succès
        Swal.fire({
          title: "Succès",
          text: "Utilisateur mis à jour avec succès.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          this.router.push("/user/list");
        });
      } catch (error) {
        if (error.response && error.response.data) {
          const { message, details } = error.response.data;
          this.errorMessage = message || "Une erreur est survenue.";
          this.errorDetails = details || [];
        } else {
          this.errorMessage = "Une erreur inattendue est survenue.";
        }
        Swal.fire({
          title: "Erreur",
          text: this.errorMessage,
          icon: "error",
          confirmButtonText: "Réessayer",
        });
      }
    },
    async fetchUser(userId) {
      this.isLoading = true;
      this.errorMessage = "";
      this.errorDetails = [];
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/${userId}`
        );
        this.user = response.data.data; // Récupère les données utilisateur
      } catch (error) {
        Swal.fire({
          title: "Erreur",
          text: "Impossible de récupérer les données de l'utilisateur.",
          icon: "error",
          confirmButtonText: "OK",
        });
        this.errorMessage =
          "Impossible de récupérer les données de l'utilisateur.";
      } finally {
        this.isLoading = false;
      }
    },
    goBack() {
      this.router.push("/user/list");
    },
  },
  created() {
    const userId = this.$route.params.id; // Récupère l'ID utilisateur depuis l'URL
    this.fetchUser(userId);
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

.btn {
  padding: 10px 20px;
  font-size: 16px;
}

.btn-primary {
  background-color: #007bff;
  border: none;
}

.alert {
  font-size: 14px;
  padding: 10px;
  margin-bottom: 15px;
}
</style>
