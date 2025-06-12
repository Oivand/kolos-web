// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
//import UserLogin from '../views/UserLogin.vue'
//import Register from '../views/UserRegister.vue' // <-- Add this line
import { useAuthStore } from '@/stores/auth'
import UserLogin from '../views/UserLogin.vue'
import UserRegister from '../views/UserRegister.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: UserLogin,
    },
    {
      path: '/register', // <-- Add this route
      name: 'register',
      component: UserRegister,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if ((to.name === 'login' || to.name === 'register') && authStore.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
