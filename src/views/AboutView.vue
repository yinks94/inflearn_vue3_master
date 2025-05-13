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
    <h2>Store</h2>
    <p>counter : {{ store.counter }}</p>
    <p>doubleCount : {{store.doubleCounter}}</p>
    <p>doubleCountPlusOne : {{store.doubleCounterOne}}</p>
    <button class="btn btn-secondary" @click="store.increment()">클릭</button>
    <hr/>
    <h2>구조분해할당 & storeToRefs </h2>
    <p>counter: {{counter}}</p>
    <p>doubleCount : {{doubleCounter}}</p>
    <p>doubleCountPlusOne : {{doubleCounterOne}}</p>
    <button class="btn btn-secondary" @click="increment()">클릭</button>
    <div class="row">
      강의교안
      <a href="https://www.gymcoding.co/">https://www.gymcoding.co/</a>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import {useCounterStore} from "@/store/counter.js";
import {storeToRefs} from "pinia";

const route = useRoute()
console.log('route.path: ', route.path)

const store = useCounterStore()

// 객체 연결이 지속되지 않음.
// const {counter, doubleCounter, doubleCounterOne } = store


const {counter, doubleCounter, doubleCounterOne} = storeToRefs(store)

// store의 action은 구조분해할당을 해도 객체 연결이 유지됨
const {increment} = store

</script>

<style lang="scss" scoped></style>
