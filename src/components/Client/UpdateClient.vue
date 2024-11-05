<template>
  <div class="update-client p-4 bg-custom-white rounded shadow-sm">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="text-custom-dark">Modifier un Client</h2>
      <button @click="goBack" type="button" class="btn btn-secondary shadow-sm">
        <i class="fas fa-arrow-left"></i> Retour
      </button>
    </div>
    <form @submit.prevent="updateClient">
      <div class="mb-3">
        <label for="name" class="form-label text-custom-dark">Nom</label>
        <input
          v-model="client.name"
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
          v-model="client.email"
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
          v-model="client.phone"
          type="tel"
          id="phone"
          class="form-control shadow-sm"
          placeholder="Entrez le numéro de téléphone"
          required
        />
      </div>
      <button type="submit" class="btn btn-custom-primary shadow-sm">
        <i class="fas fa-save"></i> Enregistrer
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      client: {
        name: '',
        email: '',
        phone: ''
      }
    };
  },
  mounted() {
    this.fetchClient();
  },
  methods: {
    async fetchClient() {
      try {
        const response = await axios.get(`http://localhost:3000/api/clients/${this.$route.params.id}`);
        this.client = response.data; // Supposant que la réponse contient l'objet client
      } catch (error) {
        console.error('Erreur lors de la récupération du client:', error);
      }
    },
    async updateClient() {
      try {
        await axios.put(`http://localhost:3000/api/clients/${this.$route.params.id}`, this.client);
        this.$router.push('/client/list'); // Redirection après la mise à jour
      } catch (error) {
        console.error('Erreur lors de la mise à jour du client:', error);
      }
    },
    goBack() {
      this.$router.back(); // Retour à la page précédente
    }
  }
};
</script>

<style scoped>
/* Styles pour le composant UpdateClient */
.bg-custom-white {
  background-color: #f8f9fa; /* Fond blanc cassé */
}
.text-custom-dark {
  color: #343a40; /* Texte gris foncé */
}
.btn-custom-primary {
  background-color: #007bff; /* Bleu primaire */
  color: white;
  border: none;
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
h2 {
  font-weight: bold;
}
.d-flex {
  display: flex;
}
.justify-content-between {
  justify-content: space-between;
}
.align-items-center {
  align-items: center;
}
</style>
