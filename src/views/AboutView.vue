<template>
  <div>
    <h2>About view</h2>
    <p>
      {{ $route.path }}
    </p>
    <p>
      {{ $route.name }}
    </p>
    <button class="btn btn-primary" @click="$router.push('/')">
      Home 으로 이동
    </button>
    <div class="row">
      강의교안
      <a href="https://www.gymcoding.co/">https://www.gymcoding.co/</a>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
console.log('route.path: ', route.path)
</script>

<style lang="scss" scoped></style>
