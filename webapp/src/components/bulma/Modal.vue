<template>
  <article :class="{ 'is-active': active }" class="modal">
    <div class="modal-background"></div>
    <div class="modal-content">
      <slot></slot>
    </div>
    <button
      v-if="closable"
      class="modal-close is-large"
      aria-label="close"></button>
  </article>
</template>

<script setup lang="ts">
  defineProps({
    active: Boolean,
    closable: {
      type: Boolean,
      default: true
    }
  })
</script>
