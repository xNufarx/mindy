<template>
  <div
    @click="isOpen = !isOpen"
    class="navbar-item has-dropdown"
    :class="{ 'is-active': isOpen }">
    <slot name="trigger"></slot>
    <div
      class="navbar-dropdown"
      :class="{ 'has-dropdown-up': up, 'is-right': right, 'is-boxed': boxed }">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  defineProps({
    right: Boolean,
    up: Boolean,
    boxed: Boolean
  })

  const isOpen = ref(false)
</script>
