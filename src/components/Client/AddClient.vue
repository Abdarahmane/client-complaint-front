<template>
  <div class="add-client p-4 bg-custom-white rounded shadow-sm">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="text-custom-dark">Ajouter un Client</h2>
      <button @click="goBack" type="button" class="btn btn-custom-secondary shadow-sm">
        <i class="fas fa-arrow-left"></i> Retour
      </button>
    </div>
    <form @submit.prevent="addClient">
      <div class="mb-3">
        <label for="name" class="form-label text-custom-dark">Nom</label>
        <input
          v-model="name"
          type="text"
          id="name"
          class="form-control shadow-sm"
          placeholder="Entrez le nom du client"
          required
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label text-custom-dark">Email</label>
        <input
          v-model="email"
          type="email"
          id="email"
          class="form-control shadow-sm"
          placeholder="Entrez l'email du client"
          required
        />
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label text-custom-dark">Téléphone</label>
        <input
          v-model="phone"
          type="text"
          id="phone"
          class="form-control shadow-sm"
          placeholder="Entrez le numéro de téléphone"
          required
        />
      </div>
      <div class="mb-3">
        <label for="address" class="form-label text-custom-dark">Adresse</label>
        <input
          v-model="address"
          type="text"
          id="address"
          class="form-control shadow-sm"
          placeholder="Entrez l'adresse"
          required
        />
      </div>
      <div class="text-start">
        <button type="submit" class="btn btn-custom-primary shadow-sm">
          <i class="fas fa-save"></i> Ajouter
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      address: ''
    };
  },
  methods: {
    async addClient() {
      const newClient = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        address: this.address
      };

      try {
        await axios.post('http://localhost:3000/api/clients', newClient);
        this.resetForm();
        this.$router.push('/client/list'); // Redirection vers la liste des clients
      } catch (error) {
        console.error("Erreur lors de l'ajout du client:", error);
      }
    },
    resetForm() {
      this.name = '';
      this.email = '';
      this.phone = '';
      this.address = '';
    },
    goBack() {
      this.$router.back(); // Retourne à la page précédente
    }
  }
};
</script>

<style scoped>
/* Styles pour le composant AddClient */
.bg-custom-white {
  background-color: #f8f9fa; /* Fond blanc cassé */
}
.text-custom-dark {
  color: #343a40; /* Texte gris foncé */
}
.shadow-sm {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* Ombre légère */
}
.form-control {
  border: 1px solid #ced4da; /* Bordure gris clair */
  transition: border-color 0.3s;
}
.form-control:focus {
  border-color: #007bff; /* Couleur de bordure bleu primaire en focus */
}
.btn-custom-primary {
  background-color: #007bff; /* Bleu primaire pour le bouton Ajouter */
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px; /* Taille ajustée */
  font-size: 1rem; /* Taille de la police */
  cursor: pointer;
  transition: background-color 0.3s;
}
.btn-custom-primary:hover {
  background-color: #0056b3; /* Bleu plus foncé au survol */
}
.btn-custom-secondary {
  background-color: #6c757d; /* Gris secondaire pour le bouton Retour */
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s;
}
.btn-custom-secondary:hover {
  background-color: #5a6268; /* Gris plus foncé au survol */
}
.text-start {
  text-align: start; /* Aligne le contenu à gauche */
}
</style>
