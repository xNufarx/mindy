<template>
  <PageHeader v-if="header" />
  <main
    :class="{
      'is-flex is-align-items-center is-justify-content-center': centered
    }">
    <slot></slot>
  </main>
  <AppLoader v-if="loading" />
</template>
<script setup lang="ts">
  import PageHeader from './PageHeader.vue'
  import AppLoader from './PageLoader.vue'

  defineProps({
    header: {
      type: Boolean,
      default: true
    },
    centered: Boolean,
    loading: Boolean
  })
</script>
<style lang="scss" scoped>
  header {
    flex: none;
  }

  main {
    flex: auto;
  }
</style>
