<template>
  <div id="home">
    <!-- Barre de navigation fixe -->
    <nav class="navbar navbar-expand-lg navbar-dark custom-navbar fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="#" @click.prevent="navigateToDashboard">Complaints Manager</a>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <!-- <li class="nav-item">
              <router-link to="/" class="nav-link">Accueil</router-link>
            </li> -->
            <li class="nav-item">
              <router-link to="/user" class="nav-link">Utilisateurs</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/client" class="nav-link">Clients</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/complaint" class="nav-link">Plaintes</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/priority" class="nav-link">Priorités</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/category" class="nav-link">Catégories</router-link>
            </li>
          </ul>
          <div class="d-flex align-items-center">
            <select class="form-select lang-select" aria-label="Langue">
              <option selected>Langue</option>
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
            <button @click="logout" class="btn btn-outline-light ms-3">Déconnexion</button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Contenu principal avec router-view et défilement vertical -->
    <main class="container-fluid main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { useAuthStore } from '../store/authStore';

export default {
  setup() {
    const authStore = useAuthStore();
    const logout = () => {
      authStore.logout();
    };

    return {
      logout,
    };
  },
};
</script>

<style scoped>
/* Style pour le composant Home.vue, y compris la navbar fixe */
.custom-navbar {
  background-color: #2c3e50;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  font-weight: bold;
  font-size: 1.5rem;
  color: #ecf0f1;
  transition: color 0.3s ease;
}

.navbar-nav .nav-link {
  color: #bdc3c7 !important;
  font-weight: 500;
  padding: 10px 15px;
  transition: color 0.3s ease;
}

.navbar-nav .nav-link:hover {
  color: #ecf0f1 !important;
  background-color: #34495e;
  border-radius: 5px;
}

.btn-outline-light {
  color: #ecf0f1;
  border-color: #ecf0f1;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.btn-outline-light:hover {
  background-color: #ecf0f1;
  color: #2c3e50;
  border-color: #2c3e50;
}

/* Style du contenu principal avec défilement vertical */
.main-content {
  padding-top: 70px; /* Espace pour compenser la barre de navigation fixe */
  height: calc(100vh - 70px); /* Hauteur ajustée */
  overflow-y: auto; /* Activer le défilement vertical */
}
</style>
