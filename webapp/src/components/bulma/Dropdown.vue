<template>
  <div
    @click="isOpen = !isOpen"
    :class="{ 'is-active': isOpen, 'is-up': up, 'is-right': right }"
    class="dropdown">
    <div class="dropdown-trigger">
      <slot name="trigger"> </slot>
    </div>
    <div class="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  defineProps({
    right: Boolean,
    up: Boolean
  })

  const isOpen = ref(false)
</script>
