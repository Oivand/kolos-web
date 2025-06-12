// src/api/axios.js
import axios from 'axios'
import { useAuthStore } from '@/stores/auth' // Импортируем authStore
import router from '@/router' // Импортируем роутер

// Базовый URL твоего Spring Boot бэкенда
axios.defaults.baseURL = 'http://localhost:8081' // <-- УБЕДИСЬ, ЧТО ЭТОТ ПОРТ СОВПАДАЕТ С ПОРТОМ ТВОЕГО SPRING БЭКЕНДА!

// Перехватчик запросов: добавляем токен авторизации
axios.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    const token = authStore.getToken // Получаем токен из Pinia Store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Перехватчик ответов: обрабатываем ошибки, особенно 401 Unauthorized
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore()
    // Если ответ 401 (Unauthorized) и это не запрос на логин
    if (error.response && error.response.status === 401 && error.config.url !== '/api/auth/login') {
      console.log('401 Unauthorized - Токен истёк или недействителен, выходим из системы...')
      authStore.clearToken() // Удаляем невалидный токен
      // Перенаправляем пользователя на страницу входа
      await router.push('/login') // Используем router.push
    }
    return Promise.reject(error)
  },
)

export default axios // Экспортируем настроенный экземпляр Axios
