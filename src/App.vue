<template>
  <div id="app" class="d-flex">
    <!-- Conditional Sidebar -->
    <aside v-if="isAuthenticated" class="sidebar">
      <div class="sidebar-header">
        <h2>Menu</h2>
      </div>
      <ul class="nav flex-column">
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
            <i class="fas fa-exclamation-triangle"></i> Plaintes
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
        <li class="nav-item">
          <button class="nav-link logout-button" @click="logout">
            <i class="fas fa-sign-out-alt"></i> Déconnexion
          </button>
        </li>
        <li class="nav-item">
          <button class="nav-link change-user-button" @click="changeUser">
            <i class="fas fa-user-cog"></i> Changer d'utilisateur
          </button>
        </li>
      </ul>
    </aside>

    <!-- Conditional Main Content -->
    <div :class="isAuthenticated ? 'content' : 'login-content'">
      <!-- Fixed Navbar -->
      <nav v-if="isAuthenticated" class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Client Complaints Manager</a>
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
            <ul class="navbar-nav me-auto"></ul>
            <div class="d-flex align-items-center">
              <select class="form-select" aria-label="Langue">
                <option selected>Langue</option>
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>
          </div>
        </div>
      </nav>

      <!-- Main Content or Login Page -->
      <main class=" container-fluid p-2">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'App',
  setup() {
    const router = useRouter();

    const isAuthenticated = computed(() => {
      return !!localStorage.getItem('authToken');
    });

    return { isAuthenticated };
  },
  methods: {
    logout() {
      localStorage.removeItem('authToken');
      this.$router.push('/login');
    },
    changeUser() {
      console.log("Changer d'utilisateur");
    },
  },
};
</script>

<style>
body {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f0f4f8;
}

#app {
  height: 100vh;
}

.sidebar {
  width: 240px;
  background-color: #343a40;
  color: #ffffff;
  padding: 20px;
  position: fixed;
  height: 100%;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
}

.sidebar-header {
  font-size: 1.6rem;
  margin-bottom: 20px;
}

.sidebar .nav-link {
  color: #ffffff;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.sidebar .nav-link:hover {
  background-color: #495057;
}

.logout-button, .change-user-button {
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 10px 15px;
  text-align: left;
  width: 100%;
}

.logout-button:hover, .change-user-button:hover {
  background-color: #495057;
}

.content {
  margin-left: 240px;
  padding-top: 56px; /* Offset for fixed navbar */
  background-color: #ffffff;
  min-height: 100vh;
}

.login-content {
  flex-grow: 1;
  min-height: 100vh;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-content {
  padding: 20px;
}

.navbar {
  z-index: 1000;
}

.form-select {
  border-radius: 5px;
}

.form-select:focus {
  border-color: #007bff;
}

i {
  margin-right: 8px;
}
</style>
