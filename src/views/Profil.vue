<template>
  <div class="container mt-4">
    <h2>Mettre à jour le profil</h2>
    <form @submit.prevent="mettreAjourProfil">
      <div class="mb-3">
        <label for="nom" class="form-label">Nom</label>
        <input
          type="text"
          id="nom"
          v-model="nom"
          class="form-control"
          placeholder="Entrez votre nom"
        />
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          class="form-control"
          placeholder="Entrez votre email"
        />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Mot de passe</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="form-control"
          placeholder="Entrez votre nouveau mot de passe"
        />
      </div>

      <button type="submit" class="btn btn-primary">Mettre à jour</button>
    </form>

    <!-- Message de réponse -->
    <div v-if="message" class="alert mt-3" :class="messageType">
      {{ message }}
    </div>

    <!-- Bouton retour -->
    <button @click="retour" class="btn btn-secondary mt-3">Retour</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nom: '',
      email: '',
      password: '',
      message: '',
      messageType: ''
    };
  },
  methods: {
    async mettreAjourProfil() {
      const token = localStorage.getItem('token');
      if (!token) {
        this.message = 'Vous devez être connecté pour mettre à jour votre profil.';
        this.messageType = 'alert-danger';
        return;
      }

      try {
        const response = await fetch('/api/users/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            nom: this.nom,
            email: this.email,
            password: this.password
          })
        });

        const data = await response.json();

        if (response.ok) {
          this.message = 'Profil mis à jour avec succès.';
          this.messageType = 'alert-success';
        } else {
          this.message = data.message || 'Une erreur est survenue.';
          this.messageType = 'alert-danger';
        }
      } catch (error) {
        console.error(error);
        this.message = 'Erreur de connexion au serveur.';
        this.messageType = 'alert-danger';
      }
    },

    // Méthode pour revenir à la page précédente
    retour() {
      this.$router.go(-1); // Revient à la page précédente dans l'historique du navigateur
    }
  },
  created() {
    // Pré-remplir le formulaire avec les informations de l'utilisateur
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.nom = user.nom || '';
      this.email = user.email || '';
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
