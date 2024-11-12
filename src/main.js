import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import 'bootstrap/dist/css/bootstrap.css'; // Import Bootstrap
import router from './router'; // Import Vue Router
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount('#app');

// Add token to Axios headers if available
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
