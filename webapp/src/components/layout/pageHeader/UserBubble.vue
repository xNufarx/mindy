<template>
  <NavBarDropdown v-if="identityStore.isAuthenticated" right>
    <template #trigger>
      <a
        class="navbar-link is-arrowless is-uppercase"
        :title="identityStore.user?.username">
        <Avatar
          v-if="identityStore.user?.avatar"
          :avatar="identityStore.user?.avatar" />
        <span v-else>
          {{ userNameInitial }}
        </span>
      </a>
    </template>
    <template #content>
      <a class="navbar-item" @click.prevent="Logout">
        <div class="icon-text is-flex-wrap-nowrap">
          <span class="icon">
            <i class="fa-solid fa-door-open"></i>
          </span>
          <span>Déconnexion</span>
        </div>
      </a>
    </template>
  </NavBarDropdown>
</template>
<script setup lang="ts">
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useIdentityStore } from '../../../stores/identityStore'
  import Avatar from '../../Avatar.vue'
  import NavBarDropdown from '../../bulma/NavBarDropdown.vue'

  const router = useRouter()
  const identityStore = useIdentityStore()
  const userNameInitial = computed(() => identityStore.user?.username.at(0))

  const Logout = async () => {
    identityStore.Logout()
    await router.push('/login')
  }
</script>
