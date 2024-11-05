<template>
  <div id="app" class="d-flex">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2>Menu</h2>
      </div>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/" class="nav-link">
            <i class="fas fa-home"></i> Accueil
          </router-link>
        </li>
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

    <!-- Main Content -->
    <div class="content">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
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
            <ul class="navbar-nav me-auto">
              <!-- Autres éléments de la barre de navigation peuvent aller ici si nécessaire -->
            </ul>
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

      <main class="main-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    logout() {
      // Logique pour déconnexion
      console.log("Déconnexion");
    },
    changeUser() {
      // Logique pour changer d'utilisateur
      console.log("Changer d'utilisateur");
    },
  },
};
</script>

<style>
/* Ajoutez vos styles globaux ici */
body {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f0f4f8; /* Couleur de fond moderne */
}

#app {
  height: 100vh;
}

.sidebar {
  width: 240px; /* Largeur de la sidebar */
  background-color: #343a40; /* Couleur sombre pour la sidebar */
  color: #ffffff; /* Couleur du texte */
  padding: 20px;
  position: fixed;
  height: 100%;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2); /* Ombre à droite */
}

.sidebar-header {
  font-size: 1.6rem;
  margin-bottom: 20px;
}

.sidebar .nav-link {
  color: #ffffff; /* Couleur des liens dans la sidebar */
  padding: 10px 15px; /* Espacement interne */
  border-radius: 5px; /* Coins arrondis */
  transition: background-color 0.3s; /* Transition pour le hover */
}

.sidebar .nav-link:hover {
  background-color: #495057; /* Couleur de fond au survol */
}

.logout-button, .change-user-button {
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 10px 15px; /* Espacement interne */
  text-align: left;
  width: 100%;
}

.logout-button:hover, .change-user-button:hover {
  background-color: #495057; /* Couleur de fond au survol pour les boutons */
}

.content {
  margin-left: 240px; /* Pour compenser la largeur de la sidebar */
  flex-grow: 1;
  background-color: #ffffff; /* Fond blanc pour le contenu principal */
  min-height: 100vh; /* Minimum de hauteur pour le contenu */
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1); /* Ombre intérieure pour le contenu */
  padding: 20px; /* Espacement interne */
}

.main-content {
  padding: 20px; /* Padding pour le contenu principal */
}

.navbar {
  margin-left: 0px; /* Supprime l'espace sous la navbar */
}

.navbar-logo {
  width: 40px; /* Largeur du logo */
  height: auto; /* Hauteur automatique pour garder les proportions */
  margin-right: 10px; /* Espacement à droite du logo */
}

.navbar-brand {
  font-weight: bold; /* Texte en gras pour le titre de la navbar */
}

.form-select {
  border-radius: 5px; /* Coins arrondis pour le select */
  transition: border-color 0.3s; /* Effet de transition */
}

.form-select:focus {
  border-color: #007bff; /* Couleur au focus */
}

i {
  margin-right: 8px; /* Espacement pour les icônes */
}
</style>
