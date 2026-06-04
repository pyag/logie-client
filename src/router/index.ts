import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/search',
    name: 'search',
    // Lazy loading (recommended for performance: loaded only when visited)
    component: () => import('../views/Search.vue'),
    props: (route) => ({ searchText: route.query.name ?? '' }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
