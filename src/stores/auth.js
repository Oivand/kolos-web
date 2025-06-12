// src/stores/auth.js
import { defineStore } from 'pinia'
import axios from 'axios' // Убедись, что Axios установлен и правильно импортируется
import router from '@/router'
// Базовый URL твоего Spring Boot бэкенда (можно убрать, если уже настроено в src/api/axios.js)
// const API_BASE_URL = 'http://localhost:8080';
// axios.defaults.baseURL = API_BASE_URL;

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('authToken') || null, // Загружаем токен из localStorage при старте
    isLoggedIn: !!localStorage.getItem('authToken'), // Проверяем, есть ли токен
  }),
  getters: {
    isAuthenticated: (state) => state.isLoggedIn,
    getToken: (state) => state.token,
  },
  actions: {
    setToken(token) {
      this.token = token
      this.isLoggedIn = true
      localStorage.setItem('authToken', token) // Сохраняем токен в localStorage
      // Устанавливаем токен для всех последующих запросов Axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    clearToken() {
      this.token = null
      this.isLoggedIn = false
      localStorage.removeItem('authToken') // Удаляем токен из localStorage
      delete axios.defaults.headers.common['Authorization'] // Удаляем заголовок авторизации
    },
    // Асинхронное действие для проверки токена при загрузке приложения
    async initializeAuth() {
      const storedToken = localStorage.getItem('authToken')
      if (storedToken) {
        this.setToken(storedToken) // Устанавливаем токен и заголовок Axios
        // Опционально: можно сделать запрос к бэкенду, чтобы проверить валидность токена
        // Это более сложный, но надежный способ. Пока можно без него.
        // try {
        //   await axios.get('/api/user/me'); // Например, запрос к защищенному эндпоинту
        //   this.isLoggedIn = true;
        // } catch (error) {
        //   console.error('Token validation failed:', error);
        //   this.clearToken(); // Если токен невалиден, очищаем его
        // }
      }
    },
    async logout() {
      this.clearToken()
      // Опционально: запрос на бэкенд для аннулирования токена на сервере (если такой эндпоинт есть)
      // try {
      //     await axios.post('/api/auth/logout');
      // } catch (error) {
      //     console.error('Logout failed on backend:', error);
      // }
      router.push('/login') // Перенаправляем пользователя на страницу входа
    },
  },
})
