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
  {
    path: '/locker/:lockername',
    name: 'publicLocker',
    component: () => import('../components/search/PublicLockerView.vue'),
    props: (route) => ({
      lockername: route.params.lockername,
      uid: route.query.uid,
      pid: route.query.pid,
    }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
