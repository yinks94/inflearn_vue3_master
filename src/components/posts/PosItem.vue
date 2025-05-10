<template>
  <AppCard>
    <h5 class="card-title">{{ title }}</h5>
    <p class="card-text">{{ content }}</p>
    <p class="text-muted">
      {{ createdDate }}
      <!-- {{ $dayjs(createdAt).format('YYYY.MM.DD HH:mm:ss') }} -->
    </p>
    <template #footer>
      <div class="d-flex flex-row-reverse">
        <button class="btn p-0" @click.stop="$emit('modal')">
          <i class="bi bi-emoji-sunglasses"></i>
        </button>
      </div>
    </template>
  </AppCard>
</template>

<script setup>
import { computed, inject } from 'vue'

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  createdAt: {
    type: [Date, String, Number],
  },
})

defineEmits(['modal'])
const dayjs = inject('dayjs')

const createdDate = computed(() =>
  dayjs(props.createdAt).format('YYYY.MM.DD HH:mm:ss'),
)
</script>

<style lang="scss" scoped></style>
