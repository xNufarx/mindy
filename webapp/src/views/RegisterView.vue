<template>
  <Page :header="false" centered>
    <form id="register-form" class="box p-5">
      <div class="field">
        <h1 class="title is-3 has-text-centered">🧠 Mindy</h1>
      </div>
      <div class="field">
        <div
          class="control is-expanded has-icons-right has-icons-left"
          :class="{ 'is-loading': usernameIsProcessing }">
          <input
            class="input"
            type="text"
            v-model="username"
            placeholder="Identifiant"
            :class="{
              'is-success': usernameIsValid,
              'is-danger':
                !!username && (!usernameIsValid || !usernameIsAvailable)
            }" />
          <span class="icon is-small is-left">
            <i class="fa-solid fa-address-card"></i>
          </span>
          <span
            v-if="!usernameIsProcessing && usernameIsAvailable"
            class="icon is-right has-text-success">
            <i class="fas fa-check"></i>
          </span>
          <span
            v-if="
              !usernameIsProcessing && usernameIsValid && !usernameIsAvailable
            "
            class="icon is-right has-text-danger">
            <i class="fas fa-xmark"></i>
          </span>
        </div>
      </div>
      <div class="field">
        <div class="control is-expanded has-icons-left">
          <input
            class="input"
            type="password"
            v-model="password"
            placeholder="Mot de passe"
            :class="{ 'is-success': passwordIsValid }" />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </div>
      </div>
      <div class="field">
        <div class="control is-expanded has-icons-left">
          <input
            class="input"
            type="password"
            v-model="passwordConfirm"
            placeholder="Confirmer mot de passe"
            :class="{
              'is-success': passwordConfirmIsValid,
              'is-danger': passwordsAreDifferents
            }" />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </div>
      </div>
      <div class="field is-grouped is-grouped-centered">
        <p class="control">
          <button
            @click="Register"
            :disabled="!canRegister"
            class="button is-success"
            :class="{ 'is-loading': isProcessing }">
            Valider
          </button>
        </p>
        <p v-if="!isProcessing" class="control">
          <RouterLink to="/login" class="button is-ghost">
            Connexion
          </RouterLink>
        </p>
      </div>
    </form></Page
  >
</template>

<script setup lang="ts">
  import { useDebounceFn } from '@vueuse/core'
  import { computed, ref, watch } from 'vue'
  import Page from '../components/layout/Page.vue'
  import {
    IsUsernameAvailable,
    RegisterQuery
  } from '../repositories/identity.repository'
  import { router } from '../router'
  import { useConfigurationStore } from '../stores/configurationStore'

  const configurationStore = useConfigurationStore()

  const username = ref('')
  const usernameIsAvailable = ref(false)
  const usernameIsProcessing = ref(false)

  const password = ref('')
  const passwordConfirm = ref('')
  const isProcessing = ref(false)

  const usernameIsValid = computed(() => username.value.length >= 3)

  const passwordIsValid = computed(() => password.value.length >= 3)
  const passwordsAreDifferents = computed(
    () => password.value != passwordConfirm.value
  )
  const passwordConfirmIsValid = computed(
    () => !!passwordConfirm.value && !passwordsAreDifferents.value
  )

  const canRegister = computed(
    () =>
      usernameIsValid.value &&
      usernameIsAvailable.value &&
      passwordIsValid.value &&
      passwordConfirmIsValid.value
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
      const success = await RegisterQuery(username.value, password.value)
      if (success) {
        await router.push('/login')
      }
    } finally {
      isProcessing.value = false
    }
  }

  const CheckUsernameAvailability = useDebounceFn(
    async () => {
      if (!usernameIsValid.value) {
        usernameIsAvailable.value = false
        usernameIsProcessing.value = false
        return
      }

      usernameIsAvailable.value = await IsUsernameAvailable(username.value)
      usernameIsProcessing.value = false
    },
    250,
    { maxWait: 1000 }
  )

  watch(username, () => {
    usernameIsProcessing.value = true
    CheckUsernameAvailability()
  })
</script>

<style lang="scss" scoped>
  #register-form {
    min-width: 30%;
  }
</style>
