<template>
  <div class="auth-container">
    <h2>Регистрация</h2>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="registerUsername">Имя пользователя:</label>
        <input
          type="text"
          id="registerUsername"
          v-model="username"
          required
          placeholder="Придумайте имя пользователя"
        />
      </div>
      <div class="form-group">
        <label for="registerEmail">Email:</label>
        <input
          type="email"
          id="registerEmail"
          v-model="email"
          required
          placeholder="Введите адрес электронной почты"
        />
      </div>
      <div class="form-group">
        <label for="registerPassword">Пароль:</label>
        <input
          type="password"
          id="registerPassword"
          v-model="password"
          required
          placeholder="Придумайте пароль"
        />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Подтвердите пароль:</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          required
          placeholder="Повторите пароль"
        />
      </div>
      <button type="submit" :disabled="loading">
        {{ loading ? 'Регистрация...' : 'Зарегистрироваться' }}
      </button>
      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
    <p class="auth-link">Уже есть аккаунт? <router-link to="/login">Войти</router-link></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/api/axios' // Используем наш настроенный Axios

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref(null)

const router = useRouter()

const handleRegister = async () => {
  loading.value = true
  error.value = null // Reset previous errors

  if (password.value !== confirmPassword.value) {
    error.value = 'Пароли не совпадают.'
    loading.value = false
    return
  }

  try {
    // Make sure the endpoint matches your Spring Boot backend's registration URL
    const response = await axios.post('/api/auth/register', {
      username: username.value,
      email: email.value,
      password: password.value,
    })

    // Check for success based on your backend's response structure
    if (response.status === 200 || response.status === 201) {
      alert('Регистрация прошла успешно! Теперь вы можете войти.')
      router.push('/login') // Redirect to login page after successful registration
    } else {
      // Handle other successful but unexpected status codes if any
      error.value = 'Регистрация не удалась по неизвестной причине.'
    }
  } catch (err) {
    console.error('Registration error:', err)
    if (err.response && err.response.data && err.response.data.message) {
      error.value = err.response.data.message // Display backend error message
    } else {
      error.value = 'Произошла ошибка при регистрации. Попробуйте еще раз.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Styles are intentionally kept consistent with Login.vue for reusability. */
/* See Login.vue for the full style block */
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
  width: calc(100% - 22px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
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
  margin-top: 10px;
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
