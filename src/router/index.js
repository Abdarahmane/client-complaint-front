import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/authStore';
import Login from '../components/auth/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import Home from '../views/Home.vue';

// Client Components
import Client from '../components/Client/Client.vue';
import AddClient from '../components/Client/AddClient.vue';
import ListClient from '../components/Client/ListClient.vue';
import UpdateClient from '../components/Client/UpdateClient.vue';
import DetailClient from '../components/Client/DetailClient.vue';

// Complaint Components
import Complaint from '../components/Complaint/Complaint.vue';
import AddComplaint from '../components/Complaint/AddComplaint.vue';
import ListComplaint from '../components/Complaint/ListComplaint.vue';
import UpdateComplaint from '../components/Complaint/UpdateComplaint.vue';
import DetailComplaint from '../components/Complaint/DetailComplaint.vue';

// Priority Components
import Priority from '../components/Priority/Priority.vue';
import AddPriority from '../components/Priority/AddPriority.vue';
import ListPriority from '../components/Priority/ListPriority.vue';
import UpdatePriority from '../components/Priority/UpdatePriority.vue';
import DetailPriority from '../components/Priority/DetailPriority.vue';

// Category Components
import Category from '../components/Category/Category.vue';
import AddCategory from '../components/Category/AddCategory.vue';
import ListCategory from '../components/Category/ListCategory.vue';
import UpdateCategory from '../components/Category/UpdateCategory.vue';
import DetailCategory from '../components/Category/DetailCategory.vue';

// User Components
import User from '../components/User/User.vue';
import AddUser from '../components/User/AddUser.vue';
import ListUser from '../components/User/ListUser.vue';
import UpdateUser from '../components/User/UpdateUser.vue';
import DetailUser from '../components/User/DetailUser.vue';

// Fonction de redirection pour l'authentification
const requireAuth = (to, from, next) => {
  const authStore = useAuthStore();
  if (authStore.isAuthenticated) {
    next();
  } else {
    next({ name: 'Login' });
  }
};

// Définir les routes
const routes = [
  { path: '/', redirect: { name: 'Login' } },
  { path: '/login', name: 'Login', component: Login },

  {
    path: '/home',
    component: Home,
    beforeEnter: requireAuth,
    children: [
      { path: 'dashboard', name: 'Dashboard', component: Dashboard },
      
      // Client Routes
      { path: 'client', name: 'Clients', component: Client },
      { path: 'client/add', name: 'AddClient', component: AddClient },
      { path: 'client/list', name: 'ListClient', component: ListClient },
      { path: 'client/update/:id', name: 'UpdateClient', component: UpdateClient },
      { path: 'client/detail/:id', name: 'DetailClient', component: DetailClient },

      // Complaint Routes
      { path: 'complaint', name: 'Complaint', component: Complaint },
      { path: 'complaint/add', name: 'AddComplaint', component: AddComplaint },
      { path: 'complaint/list', name: 'ListComplaint', component: ListComplaint },
      { path: 'complaint/update/:id', name: 'UpdateComplaint', component: UpdateComplaint },
      { path: 'complaint/detail/:id', name: 'DetailComplaint', component: DetailComplaint },

      // Priority Routes
      { path: 'priority', name: 'Priorities', component: Priority },
      { path: 'priority/add', name: 'AddPriority', component: AddPriority },
      { path: 'priority/list', name: 'ListPriority', component: ListPriority },
      { path: 'priority/update/:id', name: 'UpdatePriority', component: UpdatePriority },
      { path: 'priority/detail/:id', name: 'DetailPriority', component: DetailPriority },

      // Category Routes
      { path: 'category', name: 'Categories', component: Category },
      { path: 'category/add', name: 'AddCategory', component: AddCategory },
      { path: 'category/list', name: 'ListCategory', component: ListCategory },
      { path: 'category/update/:id', name: 'UpdateCategory', component: UpdateCategory },
      { path: 'category/detail/:id', name: 'DetailCategory', component: DetailCategory },

      // User Routes
      { path: 'user', name: 'Users', component: User },
      { path: 'user/add', name: 'AddUser', component: AddUser },
      { path: 'user/list', name: 'ListUser', component: ListUser },
      { path: 'user/update/:id', name: 'UpdateUser', component: UpdateUser },
      { path: 'user/detail/:id', name: 'DetailUser', component: DetailUser },
    ],
  },

  // Redirections pour les anciens chemins sans le préfixe "/home"
  { path: '/client', redirect: '/home/client' },
  { path: '/client/add', redirect: '/home/client/add' },
  { path: '/client/list', redirect: '/home/client/list' },
  { path: '/client/update/:id', redirect: '/home/client/update/:id' },
  { path: '/client/detail/:id', redirect: '/home/client/detail/:id' },
  { path: '/complaint', redirect: '/home/complaint' },
  { path: '/complaint/add', redirect: '/home/complaint/add' },
  { path: '/complaint/list', redirect: '/home/complaint/list' },
  { path: '/complaint/update/:id', redirect: '/home/complaint/update/:id' },
  { path: '/complaint/detail/:id', redirect: '/home/complaint/detail/:id' },
  { path: '/priority', redirect: '/home/priority' },
  { path: '/priority/add', redirect: '/home/priority/add' },
  { path: '/priority/list', redirect: '/home/priority/list' },
  { path: '/priority/update/:id', redirect: '/home/priority/update/:id' },
  { path: '/priority/detail/:id', redirect: '/home/priority/detail/:id' },
  { path: '/category', redirect: '/home/category' },
  { path: '/category/add', redirect: '/home/category/add' },
  { path: '/category/list', redirect: '/home/category/list' },
  { path: '/category/update/:id', redirect: '/home/category/update/:id' },
  { path: '/category/detail/:id', redirect: '/home/category/detail/:id' },
  { path: '/user', redirect: '/home/user' },
  { path: '/user/add', redirect: '/home/user/add' },
  { path: '/user/list', redirect: '/home/user/list' },
  { path: '/user/update/:id', redirect: '/home/user/update/:id' },
  { path: '/user/detail/:id', redirect: '/home/user/detail/:id' },
];

// Création du routeur
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Gardien global de navigation
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
