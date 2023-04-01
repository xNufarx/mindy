import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ApplicationConfiguration } from '../models/configuration'
import { GetConfiguration } from '../repositories/configuration.repository'
import { router } from '../router'

export const useConfigurationStore = defineStore('configuration', () => {
  const isLoading = ref(true)

  const configuration = ref<ApplicationConfiguration>({
    CanRegister: false,
    MustRegister: false
  })

  const Reload = async () => {
    configuration.value = await GetConfiguration()
    isLoading.value = false

    if (configuration.value.MustRegister) {
      await router.push('/register')
    }
  }

  return {
    isLoading,
    configuration,
    Reload
  }
})
