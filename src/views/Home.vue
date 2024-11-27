<template>
  <div id="home">
    <nav class="navbar navbar-expand-lg navbar-dark custom-navbar fixed-top">
      <div class="container-fluid">
        <router-link to="/home/dashboard" class="navbar-brand">
          <i class="fas fa-house"></i> Complaints Manager
        </router-link>

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
            <li class="nav-item">
              <router-link to="/user" class="nav-link">
                <i class="fas fa-users"></i> Utilisateurs
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/client" class="nav-link">
                <i class="fas fa-building"></i> Clients
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/complaint" class="nav-link">
                <i class="fas fa-exclamation-circle"></i> Réclamations
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/priority" class="nav-link">
                <i class="fas fa-star"></i> Priorités
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/category" class="nav-link">
                <i class="fas fa-th-list"></i> Catégories
              </router-link>
            </li>
          </ul>

          <div class="d-flex align-items-center">
            <!-- Nom d'utilisateur connecté -->
            <span class="nav-link-profil d-flex align-items-center me-3">
              <i class="fa-solid fa-user"></i> {{ userName }}
            </span>

            <!-- Lien vers le profil utilisateur -->
            <router-link
              to="/home/profil"
              class="nav-link nav-link-profil d-flex align-items-center"
            >
              <i class="fa-solid fa-id-badge"></i> Profil
            </router-link>

            <button @click="logout" class="btn btn-outline-light ms-3">
              <i class="fas fa-sign-out-alt"></i> Déconnexion
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="container-fluid main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { useAuthStore } from "../store/authStore";
import { computed } from "vue";

export default {
  setup() {
    const authStore = useAuthStore();
    const userName = computed(() => authStore.userName); // Utilisation de computed pour la réactivité
    const logout = () => {
      authStore.logout();
    };

    return {
      userName,
      logout,
    };
  },
};
</script>

<style scoped>
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
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Effet de focus et hover */
.navbar-nav .nav-link:hover,
.navbar-nav .nav-link:focus {
  color: #ecf0f1 !important;
  background-color: #3b5998;
}

/* Lien de profil personnalisé */
.nav-link-profil {
  color: #ecf0f1 !important;
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.nav-link-profil:hover,
.nav-link-profil:focus {
  background-color: #ecf0f1;
  color: #2c3e50 !important;
  border: 1px solid #bdc3c7;
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

.main-content {
  padding-top: 70px;
  height: calc(100vh - 70px);
  overflow-y: auto;
}
</style>
