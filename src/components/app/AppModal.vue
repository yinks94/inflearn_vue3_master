<template>
  <Transition>
    <div v-if="modelValue">
      <div class="modal-backdrop fade show"></div>
      <div class="modal fade show d-block" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <slot name="header">
                <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
                <button
                  type="button"
                  class="btn-close"
                  aria-label="Close"
                  @click="$emit('update:modelValue', false)"
                ></button>
              </slot>
            </div>
            <div class="modal-body">
              <slot> </slot>
            </div>
            <div class="modal-footer">
              <slot name="actions"> </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  modelValue: Boolean,
  title: {
    type: String,
    default: 'Title...',
  },
})

defineEmits(['close', 'update:modelValue'])
</script>

<style scoped>
.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
}
</style>
