<template>
  <nav class="navbar" role="navigation">
    <div class="navbar-brand">
      <slot name="brand"></slot>

      <button
        @click="isOpen = !isOpen"
        role="button"
        class="navbar-burger"
        :class="{ 'is-active': isOpen }"
        aria-label="menu"
        :aria-expanded="isOpen"
        data-target="nav-bar">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>
    </div>

    <div :class="{ 'is-active': isOpen }" id="nav-bar" class="navbar-menu">
      <div class="navbar-start" v-if="$slots.start">
        <slot name="start"></slot>
      </div>

      <div class="navbar-end" v-if="$slots.end">
        <slot name="end"></slot>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  const isOpen = ref(false)
</script>
