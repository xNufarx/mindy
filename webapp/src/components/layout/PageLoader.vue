<template>
  <section class="app-loader">
    <figure class="image">
      <img src="/brain.png" />
    </figure>
  </section>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  .app-loader {
    position: fixed;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.5rem;
    backdrop-filter: blur(1rem);

    figure {
      &::after {
        content: '';
        position: absolute;
        bottom: -0.5rem;
        background: rgba(43, 42, 42, 0.5);
        height: 0.25rem;
        width: 90%;
        left: 5%;
        border-radius: 50%;
        filter: blur(3px);
        animation-name: shadow;
      }

      img {
        animation-name: float;
      }

      &::after,
      img {
        animation-duration: 3s;
        animation-timing-function: ease;
        animation-iteration-count: infinite;
      }
    }

    @keyframes float {
      0% {
        transform: translatey(0px);
      }
      50% {
        transform: translatey(-20px);
      }
      100% {
        transform: translatey(0px);
      }
    }

    @keyframes shadow {
      0% {
        transform: scale(100%);
      }
      50% {
        transform: scale(75%);
      }
      100% {
        transform: scale(100%);
      }
    }
  }
</style>
