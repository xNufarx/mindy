<template>
  <Page :header="false" content-centered>
    <form id="login-form" class="box p-5">
      <div class="field">
        <h1 class="title is-3 has-text-centered">🧠 Mindy</h1>
      </div>
      <div class="field">
        <p class="control is-expanded">
          <input
            class="input"
            type="text"
            v-model="name"
            placeholder="Identifiant" />
        </p>
      </div>
      <div class="field">
        <p class="control is-expanded">
          <input
            class="input"
            type="password"
            v-model="password"
            placeholder="Mot de passe" />
        </p>
      </div>
      <div class="field is-grouped is-grouped-centered">
        <p class="control">
          <button
            @click="Connect"
            :class="{ 'is-loading': isProcessing }"
            class="button is-primary">
            Connexion
          </button>
        </p>
        <p v-if="configurationStore.configuration.CanRegister" class="control">
          <button class="button is-info" @click="Register">Inscription</button>
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
  const name = ref('')
  const password = ref('')
  const isProcessing = ref(false)

  const Connect = async () => {
    isProcessing.value = true
    try {
      await authStore.Login(name.value, password.value)

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
