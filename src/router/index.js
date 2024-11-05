import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../components/auth/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import Client from '../components/Client/Client.vue';
import AddClient from '../components/Client/AddClient.vue';
import ListClient from '../components/Client/ListClient.vue';
import UpdateClient from '../components/Client/UpdateClient.vue';
import DetailClient from '../components/Client/DetailClient.vue';

import Complaint from '../components/Complaint/Complaint.vue';
import AddComplaint from '../components/Complaint/AddComplaint.vue';
import ListComplaint from '../components/Complaint/ListComplaint.vue';
import UpdateComplaint from '../components/Complaint/UpdateComplaint.vue';
import DetailComplaint from '../components/Complaint/DetailComplaint.vue';

import Priority from '../components/Priority/Priority.vue';
import AddPriority from '../components/Priority/AddPriority.vue';
import ListPriority from '../components/Priority/ListPriority.vue';
import UpdatePriority from '../components/Priority/UpdatePriority.vue';
import DetailPriority from '../components/Priority/DetailPriority.vue';

import Category from '../components/Category/Category.vue';
import AddCategory from '../components/Category/AddCategory.vue';
import ListCategory from '../components/Category/ListCategory.vue';
import UpdateCategory from '../components/Category/UpdateCategory.vue';
import DetailCategory from '../components/Category/DetailCategory.vue';

import User from '../components/User/User.vue';
import AddUser from '../components/User/AddUser.vue';
import ListUser from '../components/User/ListUser.vue';
import UpdateUser from '../components/User/UpdateUser.vue';
import DetailUser from '../components/User/DetailUser.vue';
 // Assurez-vous d'avoir ce composant pour la page 404

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('authToken'); // Vérifie si le token est dans le stockage local
      if (token) {
        next(); // Accès autorisé si l'utilisateur est authentifié
      } else {
        next('/login'); // Redirige vers la page de connexion
      }
    },
  },
  
  // Routes pour Client
  { path: '/client', name: 'Clients', component: Client },
  { path: '/client/add', name: 'AddClient', component: AddClient },
  { path: '/client/list', name: 'ListClient', component: ListClient },
  { path: '/client/update/:id', name: 'UpdateClient', component: UpdateClient }, 
  { path: '/client/detail/:id', name: 'DetailClient', component: DetailClient },
  
  // Routes pour Complaint
  { path: '/complaint', name: 'Complaint', component: Complaint },
  { path: '/complaint/add', name: 'AddComplaint', component: AddComplaint },
  { path: '/complaint/list', name: 'ListComplaint', component: ListComplaint },
  { path: '/complaint/update/:id', name: 'UpdateComplaint', component: UpdateComplaint },
  { path: '/complaint/detail/:id', name: 'DetailComplaint', component: DetailComplaint },
  
  // Routes pour Priority
  { path: '/priority', name: 'Priorities', component: Priority },
  { path: '/priority/add', name: 'AddPriority', component: AddPriority },
  { path: '/priority/update/:id', name: 'UpdatePriority', component: UpdatePriority },
  { path: '/priority/list', name: 'ListPriority',component: ListPriority,},
  { path: '/priority/detail/:id', name: 'DetailPriority', component: DetailPriority },
  
  // Routes pour Category
  { path: '/category', name: 'Categories', component: Category },
  { path: '/category/add', name: 'AddCategory', component: AddCategory },
  { path: '/category/list', name: 'ListCategory', component: ListCategory },
  { path: '/category/update/:id', name: 'UpdateCategory', component: UpdateCategory },
  { path: '/category/detail/:id', name: 'DetailCategory', component: DetailCategory },
  
  // Routes pour User
  { path: '/user', name: 'Users', component: User },
  { path: '/user/add', name: 'AddUser', component: AddUser },
  { path: '/user/list', name: 'ListUser', component: ListUser },
  { path: '/user/update/:id', name: 'UpdateUser', component: UpdateUser },
  { path: '/user/detail/:id', name: 'DetailUser', component: DetailUser },

  // Route pour page non trouvée
//   { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
