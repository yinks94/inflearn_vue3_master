<template>
  <AppLoading v-if="loading" />
  <AppError v-else-if="error" :message="error.message" />
  <div v-else>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <AppError v-if="editError" :message="editError.message" />
    <PostForm
      v-model:title="post.title"
      v-model:content="post.content"
      @submit.prevent="edit"
    >
      <template #actions>
        <button
          type="button"
          class="btn btn-outline-danger"
          @click="goDetailPage"
        >
          취소
        </button>
        <button class="btn btn-primary" :disabled="editLoading">
          <template v-if="editLoading">
            <span
              class="spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Loading...</span>
          </template>
          <template v-else>수정</template>
        </button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import PostForm from '@/components/posts/PostForm.vue'
import { useAlert } from '@/composables/alert'
import { useAxios } from '@/composables/useAxios'

const { vAlert, vSuccess } = useAlert()

const route = useRoute()
const router = useRouter()
const id = route.params.id

const { loading, error, data: post } = useAxios(`/posts/${id}`)

const goDetailPage = () => {
  router.push({
    name: 'PostDetail',
    params: { id: id },
  })
}

const {
  error: editError,
  loading: editLoading,
  execute,
} = useAxios(
  `/posts/${id}`,
  { method: 'patch' },
  {
    immediate: false,
    onSuccess: res => {
      clickCount++
      vSuccess(`수정이 완료되었습니다!(${clickCount})`)
      goDetailPage()
    },
    onError: err => {
      console.error(err)
      vAlert(err.message)
    },
  },
)
const edit = async () => {
  execute({ ...post.value })
}
let clickCount = 0
</script>

<style lang="scss" scoped></style>
