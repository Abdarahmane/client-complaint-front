<template>
  <div class="update-client p-4 bg-custom-white rounded shadow-sm">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="text-custom-dark">Modifier un Client</h2>
    </div>
    <form @submit.prevent="updateClient" class="row g-3">
      <div class="col-md-6 mb-3">
        <label for="name" class="form-label text-custom-dark">Nom</label>
        <input
          v-model="client.name"
          type="text"
          id="name"
          class="form-control shadow-sm custom-input"
          placeholder="Entrez le nom du client"
          required
        />
        <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
      </div>
      <div class="col-md-6 mb-3">
        <label for="email" class="form-label text-custom-dark">Email</label>
        <input
          v-model="client.email"
          type="email"
          id="email"
          class="form-control shadow-sm custom-input"
          placeholder="Entrez l'email du client"
          required
        />
        <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
      </div>
      <div class="col-md-6 mb-3">
        <label for="phone" class="form-label text-custom-dark">Téléphone</label>
        <input
          v-model="client.phone"
          type="text"
          id="phone"
          class="form-control shadow-sm custom-input"
          placeholder="Entrez le numéro de téléphone"
          required
        />
        <div v-if="errors.phone" class="text-danger">{{ errors.phone }}</div>
      </div>
      <div class="col-md-6 mb-3">
        <label for="address" class="form-label text-custom-dark">Adresse</label>
        <input
          v-model="client.address"
          type="text"
          id="address"
          class="form-control shadow-sm custom-input"
          placeholder="Entrez l'adresse"
          required
        />
        <div v-if="errors.address" class="text-danger">{{ errors.address }}</div>
      </div>
      <div class="col-12 d-flex justify-content-between">
        <button type="submit" class="btn btn-custom-primary shadow-sm">
          <i class="fas fa-save"></i> Enregistrer
        </button>
        <button @click="goBack" type="button" class="btn btn-custom-secondary shadow-sm">
          <i class="fas fa-arrow-left"></i> Retour
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
      client: {
        name: '',
        email: '',
        phone: '',
        address: '',
      },
      errors: {}, // Pour stocker les erreurs de validation
    };
  },
  mounted() {
    this.fetchClient();
  },
  methods: {
    async fetchClient() {
      try {
        const response = await axios.get(`http://localhost:3000/api/clients/${this.$route.params.id}`);
        this.client = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération du client :', error);
      }
    },
   async updateClient() {
  try {
    await axios.put(`http://localhost:3000/api/clients/${this.$route.params.id}`, this.client);
    this.$router.push('/client/list'); // Redirige vers la liste des clients
  } catch (error) {
    if (error.response && error.response.data.erreurs) {
      // Correction : Utilise `path` au lieu de `param`
      this.errors = error.response.data.erreurs.reduce((acc, curr) => {
        acc[curr.path] = curr.msg; // path est utilisé pour identifier les champs
        return acc;
      }, {});
    } else {
      console.error('Erreur lors de la mise à jour du client :', error);
    }
  }
},

    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.bg-custom-white {
  background-color: #f8f9fa;
}
.text-custom-dark {
  color: #343a40;
}
.custom-input {
  font-size: 0.875rem;
  padding: 0.375rem 0.75rem;
  height: 38px;
}
.btn-custom-primary {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
}
.btn-custom-primary:hover {
  background-color: #0056b3;
}
.btn-custom-secondary {
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
}
.btn-custom-secondary:hover {
  background-color: #5a6268;
}
.update-client {
  max-width: 500px;
  margin: 0 auto;
}
.row.g-3 .col-md-6, .row.g-3 .col-12 {
  margin-bottom: 15px;
}
</style>
