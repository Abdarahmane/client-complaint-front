import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import 'bootstrap/dist/css/bootstrap.css'; // Import Bootstrap
import router from './router'; // Si vous avez configuré Vue Router
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';


const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router); // Si vous avez configuré Vue Router
app.mount('#app');
