<template>
  <Dropdown v-if="identityStore.isAuthenticated" class="is-right">
    <template #trigger>
      <Avatar
        v-if="identityStore.user?.avatar"
        :avatar="identityStore.user?.avatar"
        class="is-32x32 is-clickable" />
      <button
        v-else
        :title="identityStore.user?.username"
        class="button is-rounded">
        {{ userNameInitial }}
      </button>
    </template>
    <template #content>
      <a class="dropdown-item" @click.prevent="Logout">
        <span class="icon-text">
          <span class="icon">
            <i class="fa-solid fa-door-open"></i>
          </span>
          <span>Déconnexion</span>
        </span>
      </a>
    </template>
  </Dropdown>
</template>
<script setup lang="ts">
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useIdentityStore } from '../../../stores/identityStore'
  import Avatar from '../../Avatar.vue'
  import Dropdown from '../../Dropdown.vue'

  const router = useRouter()
  const identityStore = useIdentityStore()
  const userNameInitial = computed(() => identityStore.user?.username.at(0))

  const Logout = async () => {
    identityStore.Logout()
    await router.push('/login')
  }
</script>
