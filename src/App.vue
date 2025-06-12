<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <header class="app-header">
      <nav>
        <router-link to="/">Главная</router-link> | <router-link to="/news">Лента</router-link> |
        <router-link to="/profile">Профиль</router-link> |
        <router-link to="/chats">Чаты</router-link> |
        <router-link to="/groups">Группы</router-link> |
        <router-link to="/publication">Опубликовать</router-link> |
        <router-link to="/report">Жалоба</router-link>
        <button v-if="authStore.isAuthenticated" @click="authStore.logout()" class="logout-button">
          Выйти
        </button>
      </nav>
    </header>

    <main class="app-main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
