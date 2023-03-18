<template>
  <nav
    class="navbar is-light py-4"
    role="navigation"
    aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img src="/brain.png" class="mr-2" />
        <h3 class="title is-3 m-0">Mindy</h3>
      </router-link>

      <a
        @click="isOpen = !isOpen"
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="nav-bar">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div :class="{ 'is-active': isOpen }" id="nav-bar" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item"> Home </a>
      </div>

      <div class="navbar-end">
        <div v-if="!identityStore.isAuthenticated" class="navbar-item">
          <div class="buttons">
            <router-link to="/register" class="button is-primary">
              <strong>Inscription</strong>
            </router-link>
            <router-link to="/login" class="button is-light">
              Connexion
            </router-link>
          </div>
        </div>
        <div class="navbar-item">
          <UserBubble />
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useIdentityStore } from './../../stores/identityStore'
  import UserBubble from './pageHeader/UserBubble.vue'

  const identityStore = useIdentityStore()

  const isOpen = ref(false)
</script>
