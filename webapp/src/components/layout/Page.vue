<template>
  <PageHeader v-if="header" />
  <main
    :class="{
      'is-flex is-align-items-center is-justify-content-center': contentCentered
    }">
    <slot></slot>
  </main>
</template>
<script setup lang="ts">
  import PageHeader from './PageHeader.vue'
  defineProps({
    header: {
      type: Boolean,
      default: true
    },
    contentCentered: Boolean
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
