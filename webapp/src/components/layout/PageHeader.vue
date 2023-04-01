<template>
  <NavBar class="is-spaced is-light">
    <template #brand>
      <router-link class="navbar-item" to="/">
        <img src="/brain.png" class="mr-2" />
        <h3 class="title is-3 m-0">Mindy</h3>
      </router-link>
    </template>
    <template #start>
      <router-link class="navbar-item" to="/" active-class="is-active">
        Home
      </router-link>
      <router-link class="navbar-item" to="/users" active-class="is-active">
        <span class="icon-text">
          <span class="icon has-text-danger">
            <i class="fa-solid fa-users"></i>
          </span>
          <span>Utilisateurs</span>
        </span></router-link
      >
    </template>
    <template #end>
      <UserBubble />
    </template>
  </NavBar>
</template>

<script lang="ts" setup>
  import NavBar from '../bulma/NavBar.vue'
  import UserBubble from './pageHeader/UserBubble.vue'
</script>
