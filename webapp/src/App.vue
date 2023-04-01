<template>
  <PageLoader v-if="configurationStore.isLoading" />
  <RouterView v-else />
</template>

<script setup lang="ts">
  import PageLoader from './components/layout/PageLoader.vue'
  import { useConfigurationStore } from './stores/configurationStore'

  const configurationStore = useConfigurationStore()

  configurationStore.Reload()
</script>

<style lang="scss">
  #app {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
