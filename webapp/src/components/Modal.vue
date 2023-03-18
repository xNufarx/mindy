<template>
  <article :class="{ 'is-active': active }" class="modal">
    <div class="modal-background"></div>
    <div class="modal-content">
      <slot></slot>
    </div>
    <button class="modal-close is-large" aria-label="close"></button>
  </article>
</template>

<script setup lang="ts">
  defineProps({
    active: Boolean
  })
</script>
