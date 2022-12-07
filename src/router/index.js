import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Coin from '../views/Coin.vue'
import NotFound from '../views/NotFound.vue'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/coin/:id',
    name: 'coin',
    component: Coin
  },
  {
    path: '/404',
    name: 'not-found',
    component: NotFound
  },
  { 
    path: '/:pathMatch(.*)',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


export default router
