<template>
  <div>
    <div class="d-flex">
      <h2 class="flex-grow-1">게시글 등록</h2>
      <button class="btn btn-danger" @click="visibleForm = !visibleForm">
        폼토글
      </button>
    </div>
    <div v-if="visibleForm">
      <hr class="my-2" />
      <AppError v-if="error" :message="error.message" />
      <PostForm
        v-model:title="form.title"
        v-model:content="form.content"
        @submit.prevent="save"
      >
        <template #actions>
          <button
            type="button"
            class="btn btn-outline-dark"
            @click="goListPage"
          >
            목록
          </button>
          <button class="btn btn-primary" :disabled="loading">
            <template v-if="loading">
              <span
                class="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Loading...</span>
            </template>
            <template v-else>저장</template>
          </button>
        </template>
      </PostForm>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createPost } from '@/api/posts'
import PostForm from '@/components/posts/PostForm.vue'
import { useAlert } from '@/composables/alert'
import AppError from '@/components/app/AppError.vue'
import { useAxios } from '@/composables/useAxios'

const { vAlert, vSuccess } = useAlert()
const router = useRouter()

const form = ref({
  title: '',
  contents: '',
})

const { loading, error, execute } = useAxios(
  '/posts',
  {
    method: 'post',
  },
  {
    immediate: false,
    onSuccess: res => {
      vSuccess('등록이 완료되었습니다.!!')
      router.push({ name: 'PostList' })
    },
    onError: err => {
      console.error(err)
      vAlert(err.message)
    },
  },
)

const save = async () => {
  execute({ ...form.value, createdAt: Date.now() })
}

const goListPage = () => {
  router.push({
    name: 'PostList',
  })
}

const visibleForm = ref(true)
</script>

<style lang="scss" scoped></style>
