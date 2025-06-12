// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'
import UserLogin from '../views/UserLogin.vue'
import UserRegister from '../views/UserRegister.vue'
import ChatPage from '@/views/ChatPage.vue'
import GroupsPage from '@/views/GroupsPage.vue'
import NewsFeedPage from '@/views/NewsFeedPage.vue'
import PublicationPage from '@/views/PublicationPage.vue'
import UserProfile from '@/views/UserProfile.vue'
import ReportFormPage from '@/views/ReportFormPage.vue'

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
    {
      path: '/groups',
      name: 'groups',
      component: GroupsPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/news',
      name: 'news',
      component: NewsFeedPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/publication',
      name: 'publication',
      component: PublicationPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/profile',
      name: 'profile',
      component: UserProfile,
      meta: { requiresAuth: true },
    },
    {
      path: '/report',
      name: 'report',
      component: ReportFormPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/chats',
      name: 'chats',
      component: ChatPage,
      meta: { requiresAuth: true },
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
