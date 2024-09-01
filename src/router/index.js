import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Convert from '../views/Convert.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/convert', component: Convert },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
