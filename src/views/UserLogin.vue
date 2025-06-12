<template>
  <div class="auth-container">
    <h2>Вход в аккаунт</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="usernameOrEmail">Имя пользователя / Email:</label>
        <input
          type="text"
          id="usernameOrEmail"
          v-model="usernameOrEmail"
          required
          placeholder="Введите имя пользователя или email"
        />
      </div>
      <div class="form-group">
        <label for="password">Пароль:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          placeholder="Введите пароль"
        />
      </div>
      <button type="submit" :disabled="loading">
        {{ loading ? 'Вход...' : 'Войти' }}
      </button>
      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
    <p class="auth-link">
      Нет аккаунта? <router-link to="/register">Зарегистрироваться</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/api/axios' // Используем наш настроенный Axios
import { useAuthStore } from '@/stores/auth'

const usernameOrEmail = ref('') // Имя пользователя или email
const password = ref('')
const loading = ref(false)
const error = ref(null)

const router = useRouter()
const authStore = useAuthStore()

const handleLogin = async () => {
  loading.value = true
  error.value = null // Reset previous errors

  try {
    // Make sure the endpoint matches your Spring Boot backend's login URL
    const response = await axios.post('/api/auth/login', {
      username: usernameOrEmail.value, // Or 'email', depending on your backend
      password: password.value,
    })

    const { token } = response.data // Assuming your backend returns { token: '...' }

    // Save the token and update authentication status in Pinia store
    authStore.setToken(token)
    authStore.setLoggedIn(true)

    // Redirect to the home page after successful login
    router.push('/') // Or '/feed', '/home'
  } catch (err) {
    console.error('Login error:', err)
    if (err.response && err.response.data && err.response.data.message) {
      error.value = err.response.data.message // Display backend error message
    } else {
      error.value = 'Произошла ошибка при входе. Проверьте учетные данные.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Unified styles for both Login and Register components */
.auth-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  font-family: Arial, sans-serif;
}
h2 {
  text-align: center;
  color: #333;
  margin-bottom: 25px;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
  color: #555;
  font-weight: bold;
}
input[type='text'],
input[type='password'],
input[type='email'] {
  width: calc(100% - 22px); /* Account for padding + border */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
}
button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px; /* Space above button */
}
button:disabled {
  background-color: #a0c9f1;
  cursor: not-allowed;
}
button:hover:not(:disabled) {
  background-color: #0056b3;
}
.error-message {
  color: red;
  text-align: center;
  margin-top: 15px;
  font-size: 0.9rem;
}
.auth-link {
  text-align: center;
  margin-top: 20px;
  color: #666;
  font-size: 0.95rem;
}
.auth-link a {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}
.auth-link a:hover {
  text-decoration: underline;
}
</style>
