<template>
  <figure class="image">
    <img class="is-rounded has-background-light" :src="avatar" />
  </figure>
</template>

<script setup lang="ts">
  defineProps({
    avatar: {
      type: String,
      required: true
    }
  })
</script>
