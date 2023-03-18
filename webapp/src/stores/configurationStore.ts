import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ApplicationConfiguration } from '../models/configuration'
import { GetConfiguration } from '../repositories/configuration.repository'

export const useConfigurationStore = defineStore('configuration', () => {
  const isLoading = ref(true)

  const configuration = ref<ApplicationConfiguration>({
    CanRegister: false
  })

  const Load = async () => {
    configuration.value = await GetConfiguration()
    isLoading.value = false
  }

  return {
    isLoading,
    configuration,
    Load
  }
})
