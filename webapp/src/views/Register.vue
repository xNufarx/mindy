<template>
  <Page :header="false" content-centered>
    <form>
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
            type="text"
            v-model="password"
            placeholder="Mot de passe" />
        </p>
      </div>
      <div class="field">
        <p class="control is-expanded">
          <input
            class="input"
            type="text"
            v-model="passwordConfirm"
            placeholder="Confirmer mot de passe" />
        </p>
      </div>
      <div class="field is-centered">
        <p class="control">
          <button
            class="button is-primary"
            @click="Register"
            :disabled="!canRegister">
            Valider
          </button>
        </p>
      </div>
    </form></Page
  >
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import Page from '../components/layout/Page.vue'
  import { router } from '../router'
  import { useConfigurationStore } from '../stores/configurationStore'
  import { useIdentityStore } from '../stores/identityStore'

  const authStore = useIdentityStore()
  const configurationStore = useConfigurationStore()
  const name = ref('')
  const password = ref('')
  const passwordConfirm = ref('')
  const isProcessing = ref(false)

  const canRegister = computed(
    () => name.value.length >= 3 && password.value === passwordConfirm.value
  )

  if (!configurationStore.configuration.CanRegister) {
    router.push('/login')
  }

  const Register = async () => {
    if (!canRegister.value) {
      return
    }

    isProcessing.value = true

    try {
      await authStore.Register(name.value, password.value)

      if (authStore.isAuthenticated) {
        await router.push('/')
      }
    } finally {
      isProcessing.value = false
    }
  }
</script>
