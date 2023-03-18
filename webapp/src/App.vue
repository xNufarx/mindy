<template>
  <RouterView />
</template>

<script setup lang="ts">
  import { useConfigurationStore } from './stores/configurationStore'

  const configurationStore = useConfigurationStore()

  configurationStore.Load()
</script>

<style lang="scss">
  #app {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
