<template>
  <Page :header="false" centered>
    <form id="login-form" class="box p-5">
      <div class="field">
        <h1 class="title is-3 has-text-centered">🧠 Mindy</h1>
      </div>
      <div class="field">
        <div class="control is-expanded has-icons-left">
          <input
            class="input"
            type="text"
            v-model="username"
            placeholder="Identifiant" />
          <span class="icon is-small is-left">
            <i class="fa-solid fa-address-card"></i>
          </span>
        </div>
      </div>
      <div class="field">
        <div class="control is-expanded has-icons-left">
          <input
            class="input"
            type="password"
            v-model="password"
            placeholder="Mot de passe" />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </div>
      </div>
      <div class="field is-grouped is-grouped-centered">
        <div class="control">
          <button
            @click="Connect"
            :class="{ 'is-loading': isProcessing }"
            class="button is-success">
            Connexion
          </button>
        </div>
        <p
          v-if="configurationStore.configuration.CanRegister && !isProcessing"
          class="control">
          <button class="button is-ghost" @click="Register">Inscription</button>
        </p>
      </div>
    </form>
  </Page>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import Page from '../components/layout/Page.vue'
  import { router } from '../router'
  import { useConfigurationStore } from '../stores/configurationStore'
  import { useIdentityStore } from '../stores/identityStore'

  const authStore = useIdentityStore()
  const configurationStore = useConfigurationStore()
  const username = ref('')
  const password = ref('')
  const isProcessing = ref(false)

  const Connect = async () => {
    isProcessing.value = true
    try {
      await authStore.Login(username.value, password.value)

      if (authStore.isAuthenticated) {
        const { redirect } = router.currentRoute.value.query
        router.push(typeof redirect === 'string' ? redirect : '/')
      }
    } finally {
      isProcessing.value = false
    }
  }

  const Register = async () => {
    router.push('/register')
  }
</script>

<style lang="scss" scoped>
  #login-form {
    min-width: 30%;
  }
</style>
