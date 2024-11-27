<template>
  <div id="dashboard">
    <!-- Barre de navigation en haut -->
    <nav class="navbar navbar-expand-lg navbar-dark custom-navbar fixed-top">
      <div class="container-fluid">
      <router-link to="/home/dashboard" class="navbar-brand"> <i class="fas fa-house"></i> Complaints Manager</router-link>



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
              <router-link to="/" class="nav-link">
                <i class="fas fa-home"></i> Accueil
              </router-link>
            </li> -->
            <li class="nav-item">
              <router-link to="/user" class="nav-link">
                <i class="fas fa-users"></i> Utilisateurs
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/client" class="nav-link">
                <i class="fas fa-user"></i> Clients
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/complaint" class="nav-link">
                <i class="fas fa-exclamation-triangle"></i> Réclamations
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

    <!-- Zone de contenu principale en plein écran -->
    <main class="main-content p-2">
      <div class="content-header">
      </div>
      <!-- Contenu du tableau de bord avec les cartes -->
      <div class="dashboard-content">
        <div class="card-container">
          <!-- Cartes du tableau de bord -->
          <div class="dashboard-card">
            <i class="fas fa-users card-icon"></i>
            <div class="card-details">
              <h2>Utilisateurs</h2>
            
            </div>
          </div>
          <div class="dashboard-card">
            <i class="fas fa-building card-icon"></i>
            <div class="card-details">
              <h2>Clients</h2>
             
            </div>
          </div>
          <div class="dashboard-card">
            <i class="fas fa-exclamation-circle card-icon"></i>
            <div class="card-details">
              <h2>Réclamation</h2>
              
            </div>
          </div>
          <!-- Nouvelle carte pour Priorités -->
          <div class="dashboard-card">
            <i class="fas fa-star card-icon"></i>
            <div class="card-details">
              <h2>Priorités</h2>
              
            </div>
          </div>
          <!-- Nouvelle carte pour Catégories -->
          <div class="dashboard-card">
            <i class="fas fa-th-list card-icon"></i>
            <div class="card-details">
              <h2>Catégories</h2>
            
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useAuthStore } from '../store/authStore';

export default {
  setup() {
    const authStore = useAuthStore();
    const isAuthenticated = computed(() => authStore.isAuthenticated);

    const logout = () => {
      const userConfirmed = confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
      if (userConfirmed) {
        authStore.logout();
      }
    };

    const navigateToDashboard = () => {
      router.push({ name: 'Dashboard' }); // Utiliser le nom de la route
    };

    const dashboardCards = [
      { title: 'Utilisateurs', statistic: '', icon: 'fas fa-users' },
      { title: 'Clients', statistic: '', icon: 'fas fa-building' },
      { title: 'Plaintes', statistic: '', icon: 'fas fa-exclamation-circle' },
    ];

    return {
      isAuthenticated,
      logout,
      dashboardCards,
      navigateToDashboard,
    };
  },
};
</script>


<style scoped>
/* Styles globaux et de la navbar */
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body, #dashboard, .main-content { height: 100vh; width: 95vw; overflow: hidden; }
#dashboard { display: flex; flex-direction: column; }
.custom-navbar { background: linear-gradient(45deg, #2c3e50, #34495e); padding: 15px; }
.navbar-brand { font-weight: bold; font-size: 1.6rem; color: #ecf0f1; }
.navbar-nav .nav-link { color: #bdc3c7 !important; font-weight: 500; padding: 10px 15px; transition: color 0.3s ease; }
.navbar-nav .nav-link:hover { color: #ecf0f1 !important; }
.lang-select { background-color: #34495e; color: #ecf0f1; border: none; padding: 5px 10px; border-radius: 5px; transition: background-color 0.3s ease; }
.lang-select:hover { background-color: #3b5998; }
.fixed-top { position: fixed; top: 0; width: 100%; z-index: 1000; }

/* Styles du contenu principal et des cartes */
.main-content { background-color: #f8f9fa; flex-grow: 1; display: flex; flex-direction: column; padding-top: 70px; }
.content-header { padding: 20px; background-color: #ecf0f1; }
.dashboard-content { flex-grow: 1; display: flex; justify-content: center; align-items: center; padding: 20px; }
.card-container { display: flex; gap: 20px; flex-wrap: wrap; }
.dashboard-card { width: 220px; padding: 20px; background-color: #ecf0f1; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); border-radius: 10px; text-align: center; transition: transform 0.3s ease, box-shadow 0.3s ease; }
.dashboard-card:hover { transform: translateY(-5px); box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15); }
.card-icon { font-size: 3rem; color: #2c3e50; margin-bottom: 10px; }
.card-details h2 { font-size: 1.3rem; color: #2c3e50; margin: 0; }
.card-details p { font-size: 1.2rem; color: #34495e; font-weight: bold; }
</style>
