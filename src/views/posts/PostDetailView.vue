<template>
  <AppLoading v-if="loading" />
  <AppError v-else-if="error" :message="error.message" />
  <div v-else>
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <p class="text-muted">
      {{ $dayjs(post.createdAt).format('YYYY.MM.DD HH:mm:ss') }}
    </p>
    <hr class="my-4" />
    <AppError v-if="removeError" :message="removeError.message" />
    <div class="row g-2">
      <div class="col-auto">
        <button class="btn btn-outline-dark">이전글</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-dark">다음글</button>
      </div>
      <div class="col-auto me-auto"></div>
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="goListPage">목록</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-primary" @click="goEditPage">
          수정
        </button>
      </div>
      <div class="col-auto">
        <button
          class="btn btn-outline-danger"
          :disabled="removeLoading"
          @click="remove"
        >
          <template v-if="removeLoading">
            <span
              class="spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Loading...</span>
          </template>
          <template v-else>삭제</template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAlert } from '@/composables/alert'
import { useAxios } from '@/composables/useAxios'

const { vAlert, vSuccess } = useAlert()

const props = defineProps({
  id: String,
})

const router = useRouter()

const { loading, error, data: post } = useAxios(`/posts/${props.id}`)

const goListPage = () => {
  router.push({
    name: 'PostList',
  })
}
const goEditPage = () => {
  router.push({
    name: 'PostEdit',
    params: { id: props.id },
  })
}

const {
  loading: removeLoading,
  error: removeError,
  execute,
} = useAxios(
  `/posts/${props.id}`,
  { method: 'delete' },
  {
    immediate: false,
    onSuccess: res => {
      vSuccess('게시물 삭제가 완료되었습니다.!!')
      goListPage()
    },
    onError: err => {
      console.error(err)
      vAlert(err.message)
    },
  },
)

const remove = async () => {
  if (confirm('선택한 게시물을 삭제하시겠습니까?')) {
    execute()
  }
}
</script>

<style lang="scss" scoped></style>
