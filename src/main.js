import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import 'bootstrap/dist/css/bootstrap.css';
import router from './router';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import { useAuthStore } from './store/authStore';


const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// Synchroniser le rôle de l'utilisateur
const authStore = useAuthStore();
authStore.syncUserRole();

// Ajouter le token aux en-têtes Axios si disponible
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

app.mount('#app');
