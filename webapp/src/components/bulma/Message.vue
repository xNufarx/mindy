<template>
  <article class="message">
    <div class="message-header">
      <slot name="header" v-if="$slots.header"></slot>
      <button
        v-if="closable"
        @click="$emit('close')"
        class="delete"
        aria-label="delete"></button>
    </div>
    <div class="message-body">
      <slot></slot>
    </div>
  </article>
</template>

<script setup lang="ts">
  defineProps({
    closable: Boolean
  })

  defineEmits<{
    (event: 'close'): void
  }>()
</script>
