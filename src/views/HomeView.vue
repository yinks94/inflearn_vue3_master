<template>
  <div>
    <h2>Home view</h2>
    <p>
      {{ $route.path }}
    </p>
    <p>
      {{ $route.name }}
    </p>
    <button class="btn btn-primary" @click="goAboutPage">
      About 으로 이동
    </button>
    <hr class="my-4" />
    <AppGrid :items="items" v-slot="{ item }" col-class="col-6">
      <AppCard>{{ item }}</AppCard>
    </AppGrid>
    <hr class="my-4" />
    <h2>{{ $person.name }}</h2>
    <button class="btn btn-primary" @click="person.say">Click Person</button>
  </div>
</template>

<script>
// export default {
//   created() {
//     console.log('Person.name >> ', this.$person.name)
//     this.$person.say()
//   },
// }
</script>

<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goAboutPage = () => {
  router.push('/about')
}

const items = ref(['사과', '딸기', '포도', '바나나'])

const person = inject('person')
console.log('person.name', person.name)
</script>

<style lang="scss" scoped></style>
